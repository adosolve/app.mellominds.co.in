import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Middleware to ensuring authentication
// In a real app, you might also have a `requireRole` middleware
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

// GET /api/calendars/public/:userId/:slug - Fetch public calendar details
router.get('/public/:userId/:slug', async (req, res) => {
    try {
        const { userId, slug } = req.params;

        // Fetch calendar and therapist details
        const result = await pool.query(
            `SELECT c.*, u.user_name as therapist_name, u.email as therapist_email, u.profile_picture 
             FROM Calendars c
             JOIN Users u ON c.user_id = u.id
             WHERE c.user_id = $1 AND (c.slug = $2 OR c.slug = $3) AND c.is_active = true`,
            [userId, slug, slug.startsWith('/') ? slug : `/${slug}`]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Calendar not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching public calendar:', error);
        res.status(500).json({ error: 'Failed to fetch calendar' });
    }
});

router.use(ensureAuthenticated);

// GET /api/calendars - Fetch all calendars for user
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            'SELECT * FROM Calendars WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching calendars:', error);
        res.status(500).json({ error: 'Failed to fetch calendars' });
    }
});

// POST /api/calendars - Create a new calendar
router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, duration, type, description, slug, form_data } = req.body;

        // Validate required fields
        if (!title || !duration || !type) {
            return res.status(400).json({ error: 'Title, duration, and type are required' });
        }

        // Default slug if not provided
        const finalSlug = slug || `/${title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

        const result = await pool.query(
            `INSERT INTO Calendars (user_id, title, duration, type, description, slug, form_data) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
            [userId, title, duration, type, description, finalSlug, form_data ? JSON.stringify(form_data) : null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating calendar:', error);
        if (error.code === '23505') { // Unique violation for slug
            return res.status(409).json({ error: 'Calendar with this slug already exists' });
        }
        res.status(500).json({ error: 'Failed to create calendar' });
    }
});

// PUT /api/calendars/:id - Update calendar
router.put('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const calendarId = req.params.id;
        const { title, duration, type, description, slug, is_active, form_data } = req.body;

        // Construct dynamic update query
        let updateFields = [];
        let values = [];
        let cleanSlug = slug;

        // Basic fields
        if (title !== undefined) { updateFields.push(`title = $${values.length + 1}`); values.push(title); }
        if (duration !== undefined) { updateFields.push(`duration = $${values.length + 1}`); values.push(duration); }
        if (type !== undefined) { updateFields.push(`type = $${values.length + 1}`); values.push(type); }
        if (description !== undefined) { updateFields.push(`description = $${values.length + 1}`); values.push(description); }
        if (is_active !== undefined) { updateFields.push(`is_active = $${values.length + 1}`); values.push(is_active); }
        if (form_data !== undefined) { updateFields.push(`form_data = $${values.length + 1}`); values.push(JSON.stringify(form_data)); }

        // Handle slug specifically
        if (cleanSlug !== undefined) {
            // Ensure leading slash for consistency if not present
            if (!cleanSlug.startsWith('/')) {
                cleanSlug = '/' + cleanSlug;
            }
            updateFields.push(`slug = $${values.length + 1}`);
            values.push(cleanSlug);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        values.push(calendarId);
        values.push(userId);

        const result = await pool.query(
            `UPDATE Calendars SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${values.length - 1} AND user_id = $${values.length} 
       RETURNING *`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Calendar not found or unauthorized' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating calendar:', error);
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({ error: 'Calendar with this slug already exists' });
        }
        res.status(500).json({ error: 'Failed to update calendar' });
    }
});

// DELETE /api/calendars/:id - Delete calendar
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const calendarId = req.params.id;

        const result = await pool.query(
            'DELETE FROM Calendars WHERE id = $1 AND user_id = $2 RETURNING id',
            [calendarId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Calendar not found or unauthorized' });
        }

        res.json({ message: 'Calendar deleted successfully' });
    } catch (error) {
        console.error('Error deleting calendar:', error);
        res.status(500).json({ error: 'Failed to delete calendar' });
    }
});

export default router;
