var _ = require('lodash'),
    uuid = require('uuid'),
    config = require('./config.js'),
    dbFactory = require('./../src/db/db-factory.js'),
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
                date: (new Date()).getTime(),
            };
        transaction = _.defaults({
            receiver: options.receiver,
            sender: options.sender,
            amount: options.amount
        }, defaults);

        transactions.push(transaction);

        database.save(transactions);

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
            database.save(transactions);
            transactions.splice(index, 1);
            return true;
        }

        return false;
    },
    list: function() {
        return transactions;
    }
};
