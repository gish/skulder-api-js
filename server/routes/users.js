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
     * POST user
     ***********************/
    server.route({
        method: 'POST',
        path: '/api/v1/users',
        handler: handlers.post
    });
};
