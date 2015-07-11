var validate = require('validate.js'),
    dbFactory = require('./../db/db-factory.js'),
    config = require('./../config.js'),
    uuid = require('uuid'),
    _ = require('lodash'),
    mysql,
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
        mysql = dbFactory(config().database).init();
    },
    get: function(id, cb) {
        var query = 'SELECT id, name, email FROM users WHERE id = ?';
        mysql().query(query, [id], queryCb(cb));
    },
    add: function(data, cb) {
        var user,
            query,
            defaults = {
                id: uuid.v4()
            };
        user = _.defaults({
            email: data.email,
            name: data.name
        }, defaults);

        query = 'INSERT INTO users(id, email, name) VALUES(?, ?, ?)';
        mysql().query(query, [user.id, user.email, user.name], queryCb(function() {
            cb(user);
        }));
    },
    validate: function(data) {
        var isDataInvalid,
            constraints = {
                email: {
                    presence: true
                },
                name: {
                    presence: true
                }
            };
        isDataInvalid = validate(data, constraints);

        if (isDataInvalid) {
            throw new Error(JSON.stringify(isDataInvalid));
        }
}
};
