var Reflux = require('reflux'),
    _ = require('lodash'),
    TransactionsActions = require('./../actions/transactions.js'),
    transactions;

module.exports = Reflux.createStore({
    listenables: TransactionsActions,

    onAddCompleted: function(transaction) {
        transactions.push(transaction);
        this.trigger(transactions);
    },

    onRemoveCompleted: function(t) {
        transactions = _.filter(transactions, function(transaction) {
            return transaction.id !== t.id;
        });
        this.trigger(transactions);
    },

    onLoadCompleted: function(t) {
        transactions = t;
        this.trigger(transactions);
    },
});
