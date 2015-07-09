var fixtureDb = require('./fixture.js'),
    filesDb = require('./file.js'),
    mysqlDb = require('./mysql.js'),
    factory;

factory = function(options) {
    var db;

    if (options.type === 'fixtures') {
        fixtureDb.init(options);
        return fixtureDb;
    }

   if (options.type === 'mysql') {
        mysqlDb.init(options);
        return mysqlDb;
    }
};

module.exports = factory;
