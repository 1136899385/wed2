const mysql = require('mysql2');

const config = {
  host: '127.0.0.1', 
  user: 'root',
  password: '123456',
  database: 'crowdfunding_db',
  port: 3306
};

const pool = mysql.createPool(config);

module.exports.getConnection = () => pool.promise().getConnection();