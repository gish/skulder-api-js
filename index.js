var server = require('./src/server.js'),
    config = require('./src/config.js'),
    environment;

environment = process.argv.DEBT_ENV || 'development';

config = config(environment);

server(config).start();
