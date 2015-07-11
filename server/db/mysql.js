var mysql = require('./../services/mysql-connector.js'),
    queryCb;

queryCb = function(cb) {
    return function(err, data) {
        if (err) {
            console.error(err);
            throw new Error('mySQL error');
        } else {
            if (cb) {
                cb(data);
            }
        }
    };
};

module.exports = {
    init: function() {
        return mysql;
    },
    load: function(cb) {
        var query = 'SELECT id, sender, receiver, amount, UNIX_TIMESTAMP(date) as date, description FROM transactions';
        mysql().query(query, queryCb(cb));
    },
    add: function(data, cb) {
        var query = 'INSERT INTO transactions(id, sender, receiver, amount, date, description) VALUES(?, ?, ?, ?, FROM_UNIXTIME(?), ?)';
        mysql().query(query, [data.id, data.sender, data.receiver, data.amount, data.date, data.description], queryCb(cb));
    },
    delete: function(id, cb) {
        var query = 'DELETE FROM transactions where id = ?';
        mysql().query(query, [id], queryCb(cb));
    }
};
