var Reflux = require('reflux'),
    TransactionsActions = require('./../actions/transactions.js');

module.exports = Reflux.createStore({
    listenables: TransactionsActions,

    onAddCompleted: function() {
        this.trigger();
    },
});
