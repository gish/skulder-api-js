var mysql = require('mysql'),
    config = require('../config')(),
    connection;

connection = mysql.createConnection(config.database.url);

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = connection;
