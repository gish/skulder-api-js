var fs = require('fs'),
    config,
    envConfig;

config = {
    production: {
        port: process.env.PORT || 80,
        database: {
            type: 'mysql',
            database: 'transactions',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
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
