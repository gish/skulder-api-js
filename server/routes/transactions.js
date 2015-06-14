var handlers = require('./handlers/transactions.js');

module.exports = function(server) {
    /***********************
     * GET transactions
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/transactions',
        handler: handlers.list
    });

    /***********************
     * GET transaction
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/transactions/{id}',
        handler: handlers.get
    });

    /***********************
     * POST transaction
     ***********************/
    server.route({
        method: 'POST',
        path: '/api/v1/transactions',
        handler: handlers.post
    });

    /***********************
     * DELETE transaction
     ***********************/
    server.route({
        method: 'DELETE',
        path: '/api/v1/transactions/{id}',
        handler: handlers.delete
    });
};

