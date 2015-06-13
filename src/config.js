var config = {
    production: {
        port: 80,
    },
    development: {
        port: 3000
     }
};

module.exports = function(environment) {
    var envConfig = config[environment];

    if (!envConfig) {
        throw new Error('Invalid environment: ' + environment);
    }

    return envConfig;
};
