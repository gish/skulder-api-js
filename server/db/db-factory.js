var factory;

factory = function(options) {
    if (options.type === 'fixtures') {
        var fixtureDb = require('./fixture.js');
        fixtureDb.init(options);
        return fixtureDb;
    }

   if (options.type === 'mysql') {
        var mysqlDb = require('./mysql.js');
        mysqlDb.init(options);
        return mysqlDb;
    }
};

module.exports = factory;
