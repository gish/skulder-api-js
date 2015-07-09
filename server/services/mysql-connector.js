var mysql = require('mysql'),
    connection;

connection = mysql.createConnection({
    host: 'localhost',
    database: 'transactions',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = connection;
