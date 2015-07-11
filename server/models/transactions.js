var _ = require('lodash'),
    uuid = require('uuid'),
    validate = require('validate.js'),
    config = require('./../config.js'),
    dbFactory = require('./../db/db-factory.js'),
    transactions,
    database;

module.exports = {
    init: function() {
        database = dbFactory(config().database);
        database.load(function(data) {
            transactions = data;
        });
    },
    add: function(options) {
        var transaction,
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

        transactions.push(transaction);

        database.add(transaction);

        return transaction;
    },
    get: function(id) {
        return _.findWhere(transactions, {id: id});
    },
    delete: function(id) {
        var index = _.findIndex(transactions, function(transaction) {
            return transaction.id === id;
        });

        if (index !== -1) {
            database.delete(id);
            transactions.splice(index, 1);
            return true;
        }

        return false;
    },
    list: function() {
        return transactions;
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
