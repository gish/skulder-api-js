var fs = require('fs'),
    config,
    envConfig;

config = {
    production: {
        port: 80,
        database: {
            type: 'files',
            path: 'transactions.json'
        }
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
        console.log('Loading config for environment', environment);
        envConfig = config[environment];
    }

    if (!envConfig) {
        throw new Error('Invalid environment: ' + environment);
    }

    return envConfig;
};
