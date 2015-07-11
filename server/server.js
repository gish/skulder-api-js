var Hapi = require('hapi'),
    transactionRoutes = require('./../server/routes/transactions.js'),
    userRoutes = require('./../server/routes/users.js'),
    Transactions = require('./libs/transactions.js'),
    Users = require('./libs/users.js'),
    server = new Hapi.Server(),
    config = require('./config.js');

module.exports = function() {
    server.connection({
        port: process.env.PORT || config().port
    });

    Transactions.init();
    Users.init();

    transactionRoutes(server);
    userRoutes(server);

    return {
        start: function() {
            server.start(function() {
                console.log('Server running at', server.info.uri);
            });
        }
    };
};
