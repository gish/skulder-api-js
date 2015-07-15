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
        port: process.env.PORT || 3000,
        database: {
            type: 'mysql',
            url: process.env.CLEARDB_DATABASE_URL
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
