var Hapi = require('hapi'),
    transactionRoutes = require('./../server/routes/transactions.js'),
    userRoutes = require('./../server/routes/users.js'),
    publicRoutes = require('./../server/routes/public.js'),
    Transactions = require('./models/transactions.js'),
    Users = require('./models/users.js'),
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
    publicRoutes(server);

    return {
        start: function() {
            server.start(function() {
                console.log('Server running at', server.info.uri);
            });
        }
    };
};
