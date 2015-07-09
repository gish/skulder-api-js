var connection = require('./server/services/mysql-connector.js'),
    migrations = require('./server/migrations.js'),
    lastMigration = parseInt(process.env.DB_MIGRATION_LAST, 10) || 0,
    _ = require('lodash');

_.map(migrations, function(migration) {
    if (migration.timestamp > lastMigration) {
        console.log("Running migration: ", migration.description);
        connection.query(migration.statement, function(err, results) {
            if (err) {
                console.error('Migration failed', err);
            } else {
                lastMigration = migration.timestamp;
            }
        });
    }
});

process.env.DB_MIGRATION_LAST = lastMigration;

connection.end();
