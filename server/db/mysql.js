var mysql = require('mysql'),
    connection,
    transactions,
    _save;

_save = function() {
};

module.exports = {
    init: function(options) {
        connection = mysql.createConnection({
            host: options.host,
            database: options.database,
            user: options.username,
            password: options.password
        });

        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting to database');
            } else {
                console.log('Connected to database');
            }
        });
    },
    load: function(cb) {
    },
    add: function(data) {
    },
    delete: function(id) {
    }
};
