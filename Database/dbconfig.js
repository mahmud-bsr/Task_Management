const mysql = require('mysql');
const util = require('util');
const pool = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tm_db'
});

// mengecgek koneksi database
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Gagal Terkoneksi Database:', err);
  } else {
    console.log('Berhasil Terkoneksi Database');
    connection.release();
  }
});
pool.query = util.promisify(pool.query);
module.exports = pool;
