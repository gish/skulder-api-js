var Transactions = require('./../../models/transactions.js');

module.exports = {
    /***********************
     * GET transactions
     ***********************/
    list: function(request, reply) {
        Transactions.list(function(transactions) {
            reply(transactions);
        });
    },

    /***********************
     * GET transaction
     ***********************/
    get: function(request, reply) {
        Transactions.get(request.params.id, function(transaction) {
            if (!transaction) {
                reply().code(404);
            } else {
                reply(transaction);
            }
        });
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

        Transactions.add(transaction, function(transaction) {
            Transactions.get(transaction.id, function(transaction) {
                reply(transaction[0]).code(201).header('location','/api/v1/transactions/' + transaction.id);
            });
        });
    },

    /***********************
     * DELETE transaction
     ***********************/
    delete: function(request, reply) {
        Transactions.delete(request.params.id, function(deleted) {
            if (deleted) {
                reply();
            } else {
                reply().code(404);
            }
        });
    }
};

