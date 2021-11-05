const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company'
    },
    console.group('Connected to the database.')
);

connection.connect(function(error) {
    if (error) {
       throw error;
    }
});

module.exports = connection;