// get the client
import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic',
// });

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic',
});
// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'test',
// });

export default connection;
