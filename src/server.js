var Hapi = require('hapi'),
    routes = require('./routes.js'),
    server = new Hapi.Server();

module.exports = function(config) {
    server.connection({
        port: config.port
    });

    routes(server);

    return {
        start: function() {
            server.start(function() {
                console.log('Server running at', server.info.uri);
            });
        }
    };
};
