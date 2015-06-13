var _ = require('lodash'),
    uuid = require('uuid'),
    transactions = [];

module.exports = {
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
            transactions.splice(index, 1);
            return true;
        }

        return false;
    },
    list: function() {
        return transactions;
    }
};
