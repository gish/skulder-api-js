var fixtureDb = require('./fixture.js'),
    filesDb = require('./file.js'),
    factory;

factory = function(options) {
    var db;

    if (options.type === 'fixtures') {
        fixtureDb.init(options);
        return fixtureDb;
    }

    if (options.type === 'files') {
        filesDb.init(options);
        return filesDb;
    }
};

module.exports = factory;
