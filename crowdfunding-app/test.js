const db = require('./crowdfunding_db');

async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log(rows[0].solution); // 应该输出 2
    console.log('Database connection successful!');
    connection.release(); // 释放连接
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testDBConnection();