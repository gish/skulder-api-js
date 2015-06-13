var server = require('./src/server.js'),
    config = require('./src/config.js'),
    Transactions = require('./src/transactions.js'),
    environment;

environment = process.env.DEBT_ENV || 'development';

config(environment);

Transactions.init();

server().start();
