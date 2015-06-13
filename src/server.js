var Hapi = require('hapi'),
    Transactions = require('./transactions.js'),
    server = new Hapi.Server();

server.connection({
    port: 3000,
});

/***********************
 * GET transactions
 ***********************/
server.route({
    method: 'GET',
    path: '/transactions',
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
    path: '/transactions/{id}',
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
    path: '/transactions',
    handler: function(request, reply) {
        var transaction = {
            sender: request.payload.sender,
            receiver: request.payload.receiver,
            amount: request.payload.amount
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
    path: '/transactions/{id}',
    handler: function(request, reply) {
        var result = Transactions.delete(request.params.id);
        console.log(request.params.id);
        if (!result) {
            reply().code(404);
        } else {
            reply();
        }
    }
});

module.exports = {
    start: function() {
        server.start(function() {
            console.log('Server running at', server.info.uri);
        });
   }
};
