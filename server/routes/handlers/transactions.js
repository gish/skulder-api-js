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
            sender: request.payload.sender,
            receiver: request.payload.receiver,
            amount: parseInt(request.payload.amount, 10),
            description: request.payload.description
        };

        try {
            Transactions.validate(transaction);
        } catch(e) {
            reply(e.message).code(400);
            return;
        }

        transaction = Transactions.add(transaction);
        reply(transaction).code(201);
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

