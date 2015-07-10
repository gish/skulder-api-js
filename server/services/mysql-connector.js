var mysql = require('mysql'),
    config = require('../config')(),
    connection,
    connect;


connect = function() {
    connection = mysql.createConnection(config.database.url);

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to database', err.message);

            setTimeout(function() {
                connect();
            }, 2000);
        } else {
            console.log('Connected to database');
        }
    });

    connection.on('error', function(err) {
        console.error('Database error', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            throw err;
        }
    });
};

connect();

module.exports = function() {
    return connection;
};
