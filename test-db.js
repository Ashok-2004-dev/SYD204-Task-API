
require('dotenv').config();

const pool = require('./src/db');

async function testConnection() {
  try {
    const [rows] = await pool.query(
      'SELECT 1 AS ok, DATABASE() AS db, NOW() AS now'
    );

    console.log('Connected to MySQL successfully!');
    console.log(rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
