var mysql = require('mysql'),
    connection;

connection = mysql.createConnection({
    host: process.env.CLEARDB_DATABASE_URL,
    database: process.env.DB_NAME,
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
