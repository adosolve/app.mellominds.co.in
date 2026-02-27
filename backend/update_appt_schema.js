import pool from './config/database.js';

async function updateSchema() {
    try {
        await pool.query(`ALTER TABLE Appointments ADD COLUMN IF NOT EXISTS form_responses JSONB;`);
        console.log("Column form_responses added to Appointments");
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}
updateSchema();
