const db = require('./crowdfunding_db');

async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log(rows[0].solution); 
    console.log('Database connection successful!');
    connection.release(); 
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testDBConnection();