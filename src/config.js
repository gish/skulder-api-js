var fs = require('fs'),
    config,
    envConfig;

config = {
    production: {
        port: 80,
    },
    development: {
        port: 3000,
        database: {
            type: 'fixtures',
            path: 'support/fixtures.json'
        }
    }
};


module.exports = function(environment) {
    if (!!environment) {
        envConfig = config[environment];
    }

    if (!envConfig) {
        throw new Error('Invalid environment: ' + environment);
    }

    return envConfig;
};
