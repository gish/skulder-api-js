var server = require('./server/server.js'),
    config = require('./server/config.js'),
    Transactions = require('./server/libs/transactions.js'),
    environment;

environment = process.env.NODE_ENV || 'development';

config(environment);

Transactions.init();

server().start();
