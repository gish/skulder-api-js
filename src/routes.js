var Transactions = require('./transactions.js');

module.exports = function(server) {
    /***********************
     * GET transactions
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/transactions',
        handler: function(request, reply) {
            var transactions = Transactions.list();

            reply(transactions);
        }
    });

    /***********************
     * GET transaction
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/transactions/{id}',
        handler: function(request, reply) {
            var transaction = Transactions.get(request.params.id);

            if (!transaction) {
                reply().code(404);
            } else {
                reply(transaction);
            }
        }
    });

    /***********************
     * POST transaction
     ***********************/
    server.route({
        method: 'POST',
        path: '/api/v1/transactions',
        handler: function(request, reply) {
            var transaction = {
                sender: parseInt(request.payload.sender, 10),
                receiver: parseInt(request.payload.receiver, 10),
                amount: parseInt(request.payload.amount, 10)
            };

            transaction = Transactions.add(transaction);

            reply(transaction);
        }
    });

    /***********************
     * DELETE transaction
     ***********************/
    server.route({
        method: 'DELETE',
        path: '/api/v1/transactions/{id}',
        handler: function(request, reply) {
            var result = Transactions.delete(request.params.id);

            if (!result) {
                reply().code(404);
            } else {
                reply();
            }
        }
    });
};

