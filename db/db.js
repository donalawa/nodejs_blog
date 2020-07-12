const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-blog',
    password: '12345678'
});

module.exports = pool.promise();