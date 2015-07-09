var migrations = require('./server/migrations.js'),
    lastMigration = parseInt(process.env.DB_MIGRATION_LAST, 10) || 0,
    _ = require('lodash'),
    config = require('./server/config.js'),
    connection,
    environment;


environment = process.env.NODE_ENV || 'development';
config(environment);

connection = require('./server/services/mysql-connector.js');

_.map(migrations, function(migration) {
    if (migration.timestamp > lastMigration) {
        console.log("Running migration: ", migration.description);
        connection.query(migration.statement, function(err, results) {
            if (err) {
                throw new Error('Migration ' + migration.description + ' failed');
            } else {
                lastMigration = migration.timestamp;
            }
        });
    }
});

process.env.DB_MIGRATION_LAST = lastMigration;

connection.end();
