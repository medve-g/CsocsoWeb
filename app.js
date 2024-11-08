const mysql = require("mysql2/promise")
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mozaik'
    });

    // Execute a simple query
    const [rows, fields] = await connection.execute('SELECT * FROM helyszin');
    console.log('Query results:', rows);

    await connection.end();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

connectToDatabase()

