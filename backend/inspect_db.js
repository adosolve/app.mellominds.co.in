import pool from './config/database.js';

async function describeTable() {
    const res = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'appointments';`);
    console.log("Appointments columns:", res.rows);
    process.exit(0);
}

describeTable();
