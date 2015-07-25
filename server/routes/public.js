var handlers = require('./handlers/public.js');

module.exports = function(server) {
    /***********************
     * GET static files
     ***********************/
    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: handlers.get
    });

};
