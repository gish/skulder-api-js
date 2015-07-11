var _ = require('lodash'),
    uuid = require('uuid'),
    validate = require('validate.js'),
    config = require('./../config.js'),
    dbFactory = require('./../db/db-factory.js'),
    queryCb,
    mysql;

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
    add: function(options, cb) {
        var transaction,
            query,
            defaults = {
                id: uuid.v4(),
                date: Math.floor((new Date()).getTime() / 1E3)
            };
        transaction = _.defaults({
            receiver: options.receiver,
            sender: options.sender,
            amount: options.amount,
            description: options.description
        }, defaults);

        query = 'INSERT INTO transactions(id, sender, receiver, amount, date, description) VALUES(?, ?, ?, ?, FROM_UNIXTIME(?), ?)';
        mysql().query(query, [transaction.id, transaction.sender, transaction.receiver, transaction.amount, transaction.date, transaction.description], queryCb(function() {
            return cb(transaction);
        }));
    },
    get: function(id, cb) {
        var query = 'SELECT id, sender, receiver, amount, date, description FROM transactions WHERE id = ?';
        mysql().query(query, [id], queryCb(cb));
    },
    delete: function(id, cb) {
        var query = 'DELETE FROM transactions WHERE id = ?';
        mysql().query(query, [id], queryCb(function(result) {
            cb(result.affectedRows === 1);
        }));
    },
    list: function(cb) {
        var query = 'SELECT id, sender, receiver, amount, date, description FROM transactions';
        mysql().query(query, queryCb(cb));
    },
    validate: function(data) {
        var isDataInvalid,
            constraints = {
            amount: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            sender: {
                presence: true,
                format: {
                    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
                    flags: 'i',
                    message: 'must be uuid'
                }
            },
            receiver: {
                presence: true,
                format: {
                    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
                    flags: 'i',
                    message: 'must be uuid'
                }
            },
            description: {
                presence: true
            }
        };

        isDataInvalid = validate(data, constraints);

        if (isDataInvalid) {
            throw new Error(JSON.stringify(isDataInvalid));
        }
    }

};
