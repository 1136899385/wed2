const mysql = require('mysql2');

const config = {
  host: '127.0.0.1', 
  user: 'root',
  password: '123456',
  database: 'crowdfunding_db',
  port: 3306,
  waitForConnections: true, // 等待连接可用
  connectionLimit: 999, // 连接池中的最大连接数
  queueLimit: 0 // 队列请求的最大数量，0 表示无限制
};

const pool = mysql.createPool(config);

module.exports.getConnection = () => pool.promise().getConnection();