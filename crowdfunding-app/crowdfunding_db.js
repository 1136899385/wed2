const mysql = require('mysql2');

// 数据库连接配置
const config = {
  host: '127.0.0.1', // 使用 IPv4 地址
  user: 'root',
  password: '123456',
  database: 'crowdfunding_db',
  port: 3306
};

// 创建连接池
const pool = mysql.createPool(config);

// 导出一个获取连接的方法
module.exports.getConnection = () => pool.promise().getConnection();