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
        var isDataInvalid;
        var constraints = {
            amount: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            sender: {
                presence: true
            },
            receiver: {
                presence: true
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
