var Hapi = require('hapi'),
    routes = require('./routes.js'),
    server = new Hapi.Server(),
    config = require('./config.js');

module.exports = function() {
    server.connection({
        port: config().port
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
