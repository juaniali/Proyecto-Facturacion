const mysql = require('mysql2');

const pool = mysql.createPool({
  host :'mysql-lambrechtdatabase.alwaysdata.net',
  user :'366567_admin',
  password:'366567Admin',
  database:'lambrechtdatabase_cafe',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  conn : pool.promise()
}