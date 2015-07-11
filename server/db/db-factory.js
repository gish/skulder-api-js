var factory;

factory = function(options) {
   if (options.type === 'mysql') {
        var mysqlDb = require('./mysql.js');
        mysqlDb.init(options);
        return mysqlDb;
    }
};

module.exports = factory;
