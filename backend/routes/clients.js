import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Middleware to ensure authentication
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Not authenticated' });
};

router.use(ensureAuthenticated);

// PUT /api/clients/:id - Update client details
router.put('/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        const userId = req.user.id;
        const clientId = parseInt(req.params.id);
        const {
            name, phone, email,
            age, occupation, gender, maritalStatus,
            emergencyName, emergencyPhone, emergencyRelation
        } = req.body;

        await client.query('BEGIN');

        // Check if client exists and belongs to therapist
        const checkRes = await client.query(
            'SELECT id FROM Clients WHERE id = $1 AND therapist_id = $2',
            [clientId, userId]
        );

        if (checkRes.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Client not found' });
        }

        // Update client
        const updateQuery = `
            UPDATE Clients 
            SET 
                name = COALESCE($1, name),
                phone = COALESCE($2, phone),
                email = COALESCE($3, email),
                age = COALESCE($4, age),
                occupation = COALESCE($5, occupation),
                gender = COALESCE($6, gender),
                marital_status = COALESCE($7, marital_status),
                emergency_name = COALESCE($8, emergency_name),
                emergency_phone = COALESCE($9, emergency_phone),
                emergency_relation = COALESCE($10, emergency_relation),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $11 AND therapist_id = $12
            RETURNING *
        `;

        const values = [
            name, phone, email,
            age, occupation, gender, maritalStatus,
            emergencyName, emergencyPhone, emergencyRelation,
            clientId, userId
        ];

        const result = await client.query(updateQuery, values);

        await client.query('COMMIT');

        const row = result.rows[0];
        res.json({
            id: row.id,
            name: row.name,
            phone: row.phone,
            email: row.email,
            age: row.age,
            occupation: row.occupation,
            gender: row.gender,
            maritalStatus: row.marital_status,
            emergencyName: row.emergency_name,
            emergencyPhone: row.emergency_phone,
            emergencyRelation: row.emergency_relation
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'Failed to update client' });
    } finally {
        client.release();
    }
});

export default router;
