var Reflux = require('reflux'),
    TransactionsActions = require('./../actions/transactions.js'),
    transactions;

module.exports = Reflux.createStore({
    listenables: TransactionsActions,

    onAddCompleted: function(transaction) {
        transactions.push(transaction);
        this.trigger(transactions);
    },

    onLoadCompleted: function(t) {
        transactions = t;
        this.trigger(transactions);
    },
});
