const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    host:'localhost',
    password: 'Tokio135',
    database: 'FinalProject'
});

module.exports = pool;

