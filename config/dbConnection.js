require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,  // the number of connections nodes can hold at once
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.DB_PORT
});

// Log when a connection is made to the pool
pool.on('connection', function (connection) {
    console.log('DB Connection established');

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });

    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });
});

module.exports = pool;
