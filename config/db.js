const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'srv1552.hstgr.io',
  user: 'u217412984_coderealm',
  password: '@Consolelog3', // empty password for XAMPP default
  database: 'u217412984_coderealm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection immediately
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit if we can't connect
  }
  console.log('Successfully connected to MySQL');
  connection.release();
});

module.exports = pool.promise();