var Hapi = require('hapi'),
    routes = require('./../server/routes/transactions.js'),
    server = new Hapi.Server(),
    config = require('./config.js');

module.exports = function() {
    server.connection({
        port: process.env.PORT || config().port
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
