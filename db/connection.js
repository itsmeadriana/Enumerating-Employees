const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company'
    },
    console.group('Connected to the database.')
);

module.exports = db;