import pool from './config/database.js';

async function updateSchema() {
    try {
        await pool.query(`ALTER TABLE Calendars ADD COLUMN IF NOT EXISTS form_data JSONB;`);
        console.log("Column form_data added to Calendars");
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}
updateSchema();
