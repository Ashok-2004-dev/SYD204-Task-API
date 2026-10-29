
const mysql2 = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const poolConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

if ((process.env.DB_SSL || '').toUpperCase() === 'REQUIRED') {
  poolConfig.ssl = {
    ca: fs.readFileSync(
      path.join(__dirname, '..', 'certs', 'ca.pem'),
      'utf8'
    ),
    rejectUnauthorized: true
  };
}

const pool = mysql2.createPool(poolConfig);

module.exports = pool;
