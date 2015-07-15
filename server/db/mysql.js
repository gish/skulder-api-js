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
};
