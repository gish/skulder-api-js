var Transactions = require('./../../libs/transactions.js');

module.exports = {
    /***********************
     * GET transactions
     ***********************/
    list: function(request, reply) {
        var transactions = Transactions.list();
        reply(transactions);
    },

    /***********************
     * GET transaction
     ***********************/
    get: function(request, reply) {
        var transaction = Transactions.get(request.params.id);

        if (!transaction) {
            reply().code(404);
        } else {
            reply(transaction);
        }
    },

    /***********************
     * POST transaction
     ***********************/
    post: function(request, reply) {
        var transaction = {
            sender: parseInt(request.payload.sender, 10),
            receiver: parseInt(request.payload.receiver, 10),
            amount: parseInt(request.payload.amount, 10)
        };

        transaction = Transactions.add(transaction);

        reply(transaction);
    },

    /***********************
     * DELETE transaction
     ***********************/
    delete: function(request, reply) {
        var result = Transactions.delete(request.params.id);

        if (!result) {
            reply().code(404);
        } else {
            reply();
        }
    }
};

