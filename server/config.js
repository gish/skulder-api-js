var config,
    envConfig;

config = {
    production: {
        port: process.env.PORT || 80,
        database: {
            type: 'mysql',
            url: process.env.CLEARDB_DATABASE_URL
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
