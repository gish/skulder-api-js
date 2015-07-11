var handlers = require('./handlers/users.js');

module.exports = function(server) {
    /***********************
     * GET user
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/users/{id}',
        handler: handlers.get
    });

    /***********************
     * GET user transactions
     ***********************/
    server.route({
        method: 'GET',
        path: '/api/v1/users/{id}/transactions',
        handler: handlers.getTransactions
    });

    /***********************
     * POST user
     ***********************/
    server.route({
        method: 'POST',
        path: '/api/v1/users',
        handler: handlers.post
    });
};
