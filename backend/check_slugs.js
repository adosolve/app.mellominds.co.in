import pool from './config/database.js';

const checkDB = async () => {
    try {
        const res = await pool.query('SELECT id, user_id, title, slug, is_active FROM Calendars');
        console.log('Calendars:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

checkDB();
