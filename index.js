var server = require('./server/server.js'),
    config = require('./server/config.js'),
    environment;

environment = process.env.NODE_ENV || 'development';

config(environment);

server().start();
