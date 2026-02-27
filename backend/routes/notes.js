
import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

router.use(ensureAuthenticated);

// POST /api/notes - Create a new note
// Body: { appointment_id, content } where content is ideally JSON but handled as passed
router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const { appointment_id, content } = req.body;
        const therapist_id = req.user.id;

        if (!appointment_id || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if appointment exists (optional but good practice)
        // For now, straight insert.

        const result = await client.query(
            `INSERT INTO SessionNotes (appointment_id, therapist_id, note_content)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [appointment_id, therapist_id, content] // content passed as is, pg handles JSONB conversion if object
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Failed to add note' });
    } finally {
        client.release();
    }
});

// GET /api/notes/:appointmentId - Get notes for an appointment
// Filters by therapist_id (current user) so users don't see others' notes
router.get('/:appointmentId', async (req, res) => {
    const client = await pool.connect();
    try {
        const { appointmentId } = req.params;
        const therapist_id = req.user.id;

        const result = await client.query(
            `SELECT * FROM SessionNotes 
             WHERE appointment_id = $1 AND therapist_id = $2
             ORDER BY created_at DESC`,
            [appointmentId, therapist_id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    } finally {
        client.release();
    }
});

export default router;
