var mysql = require('mysql'),
    connection;

connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = connection;
