import pool from './config/database.js';

const debugQuery = async () => {
    const userId = 6;
    const slug = 'counselling-1769974946143';

    // Simulate logic
    const param3 = slug.startsWith('/') ? slug : `/${slug}`;
    console.log('Params:', [userId, slug, param3]);

    try {
        const result = await pool.query(
            `SELECT c.*, u.user_name as therapist_name, u.email as therapist_email, u.profile_picture 
             FROM Calendars c
             JOIN Users u ON c.user_id = u.id
             WHERE c.user_id = $1 AND (c.slug = $2 OR c.slug = $3) AND c.is_active = true`,
            [userId, slug, param3]
        );
        console.log('Result count:', result.rows.length);
        if (result.rows.length > 0) {
            console.log('First row title:', result.rows[0].title);
        }
    } catch (err) {
        console.error('SQL Error:', err);
    } finally {
        process.exit();
    }
};

debugQuery();
