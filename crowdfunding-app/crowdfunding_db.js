const mysql = require('mysql2');

// Database configuration settings
const config = {
  host: '127.0.0.1', // Database server IP address
  user: 'root', // Database username
  password: '123456', // Database password
  database: 'crowdfunding_db', // Name of the database
  port: 3306, // Database server port
  waitForConnections: true, // Wait for connections to become available
  connectionLimit: 999, // Maximum number of connections in the connection pool
  queueLimit: 0 // Maximum number of queued requests; 0 means unlimited
};

// Create a connection pool using the provided configuration
const pool = mysql.createPool(config);

// Export a function to get a promise-based connection from the pool
module.exports.getConnection = () => pool.promise().getConnection();