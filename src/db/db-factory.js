var fixtureDb = require('./fixture.js'),
    factory;

factory = function(options) {
    if (options.type === 'fixtures') {
        var db = fixtureDb;
        fixtureDb.init(options);
        return fixtureDb;
    }
};

module.exports = factory;
