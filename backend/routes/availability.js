import express from 'express';
import { google } from 'googleapis';
import pool from '../config/database.js';

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
);

// Middleware
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: 'Not authenticated' });
};

// GET /api/availability - Get user's weekly availability settings
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM Availability WHERE user_id = $1 ORDER BY day_of_week, start_time',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});

// POST /api/availability - Update weekly availability
router.post('/', ensureAuthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        const { schedule } = req.body; // Array of { day_of_week, start_time, end_time, is_enabled }

        console.log(`Updating availability for User ID: ${req.user.id}`);
        // console.log('Schedule payload:', JSON.stringify(schedule, null, 2)); // Uncomment if needed, but might be verbose

        await client.query('BEGIN');

        // Clear existing availability for user (simple replacement strategy)
        await client.query('DELETE FROM Availability WHERE user_id = $1', [req.user.id]);

        // Insert new schedule
        for (const slot of schedule) {
            // Validate data before insert
            if (!slot.start_time || !slot.end_time) {
                console.warn(`Skipping invalid slot for day ${slot.day_of_week}: missing times`);
                continue;
            }
            await client.query(
                `INSERT INTO Availability (user_id, day_of_week, start_time, end_time, is_enabled)
                 VALUES ($1, $2, $3, $4, $5)`,
                [req.user.id, slot.day_of_week, slot.start_time, slot.end_time, slot.is_enabled]
            );
        }

        await client.query('COMMIT');
        console.log('Availability updated successfully');
        res.json({ message: 'Availability updated successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating availability - Full Error:', error);
        res.status(500).json({ error: 'Failed to update availability', details: error.message });
    } finally {
        client.release();
    }
});

// GET /api/availability/slots?date=YYYY-MM-DD&calendarId=...&timeZone=...
// Public endpoint for checking slots
router.get('/slots', async (req, res) => {
    const client = await pool.connect();
    try {
        const { date, calendarId, timeZone = 'UTC' } = req.query;

        if (!date || !calendarId) {
            return res.status(400).json({ error: 'Date and Calendar ID are required' });
        }

        // 1. Get Calendar & Therapist Info
        const calRes = await client.query('SELECT user_id, duration FROM Calendars WHERE id = $1', [calendarId]);
        if (calRes.rows.length === 0) return res.status(404).json({ error: 'Calendar not found' });

        const { user_id: therapistId, duration } = calRes.rows[0];
        const durationMinutes = parseInt(duration.match(/\d+/)[0]) || 60;

        // 2. Determine Day of Week (0-6)
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay();

        // 3. Fetch Platform Availability for that day
        const availRes = await client.query(
            `SELECT start_time, end_time 
             FROM Availability 
             WHERE user_id = $1 AND day_of_week = $2 AND is_enabled = true`,
            [therapistId, dayOfWeek]
        );

        if (availRes.rows.length === 0) {
            return res.json([]); // No availability set for this day
        }

        // 4. Fetch Google Calendar "Busy" Times
        let busySlots = [];
        const tokenRes = await client.query(
            "SELECT access_token, refresh_token, expiry_date FROM UserIntegrations WHERE user_id = $1 AND provider = 'google'",
            [therapistId]
        );

        if (tokenRes.rows.length > 0) {
            const tokens = tokenRes.rows[0];
            oauth2Client.setCredentials(tokens);
            const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

            // Calculate day start/end in ISO
            const timeMin = new Date(date).toISOString(); // 00:00:00
            const timeMax = new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString(); // 23:59:59 next day

            try {
                const fbRes = await calendar.freebusy.query({
                    requestBody: {
                        timeMin,
                        timeMax,
                        timeZone,
                        items: [{ id: 'primary' }]
                    }
                });
                busySlots = fbRes.data.calendars.primary.busy || [];
            } catch (gErr) {
                console.error('Google FreeBusy Error:', gErr);
                // Fail gracefully? Or block all? Let's proceed with platform availability only but log error.
            }
        }

        // 5. Fetch Internal Appointments "Busy" Times
        const apptRes = await client.query(
            `SELECT start_time, end_time FROM Appointments 
             WHERE therapist_id = $1 
             AND start_time >= $2::timestamp 
             AND start_time < ($2::timestamp + interval '1 day')
             AND status != 'cancelled'`,
            [therapistId, date]
        );
        const internalBusy = apptRes.rows.map(row => ({
            start: new Date(row.start_time).toISOString(),
            end: new Date(row.end_time).toISOString()
        }));

        // Combine all busy slots
        const allBusy = [...busySlots, ...internalBusy].map(slot => ({
            start: new Date(slot.start).getTime(),
            end: new Date(slot.end).getTime()
        }));

        // 6. Calculate Available Slots
        let availableSlots = [];

        for (const window of availRes.rows) {
            // Convert "09:00:00" strings to timestamps for calculation
            const [h1, m1] = window.start_time.split(':');
            const [h2, m2] = window.end_time.split(':');

            let slotStart = new Date(selectedDate); // Clone date
            slotStart.setHours(parseInt(h1), parseInt(m1), 0, 0);

            let windowEnd = new Date(selectedDate);
            windowEnd.setHours(parseInt(h2), parseInt(m2), 0, 0);

            // Generate potential slots
            while (slotStart.getTime() + durationMinutes * 60000 <= windowEnd.getTime()) {
                const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);

                // Check if this slot overlaps with any busy slot
                const isBusy = allBusy.some(busy => {
                    return (
                        (slotStart.getTime() < busy.end) && (slotEnd.getTime() > busy.start)
                    );
                });

                if (!isBusy) {
                    availableSlots.push(slotStart.toISOString());
                }

                // Increment slot by 30 minutes (fixed interval)
                slotStart = new Date(slotStart.getTime() + 30 * 60000);
            }
        }

        res.json(availableSlots);

    } catch (error) {
        console.error('Error calculating slots:', error);
        res.status(500).json({ error: 'Failed to calculate availability' });
    } finally {
        client.release();
    }
});

export default router;
