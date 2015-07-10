var migrations = require('./server/migrations.js'),
    _ = require('lodash'),
    config = require('./server/config.js'),
    mysql,
    environment,
    migrator,
    installer;


environment = process.env.NODE_ENV || 'development';
config(environment);

mysql = require('./server/services/mysql-connector.js');

migrator = {
    getLastMigrationTimestamp: function(cb) {
        var query = "SELECT timestamp FROM migrations";
        mysql.query(query, function(err, data) {
            if (err) {
                throw new Error('Failed retrieving last migration timestamp');
            }
            cb(data[0].timestamp);
        });
    },
    runMigration: function(migration, cb) {
        console.log("Running migration: ", migration.description);
        mysql.query(migration.statement, function(err, results) {
            if (err) {
                throw new Error('Migration ' + migration.description + ' failed');
            }
            cb(err, results);
        });
    },
    updateMigrationTimestamp: function(timestamp, cb) {
        var query = "UPDATE migrations SET timestamp = ?";
        mysql.query(query, [timestamp], function(err, data) {
            if (err) {
                throw new Error("Couldn't update migration timestamp", err);
            }
            cb(err, data);
        });
    },
    migrationsToRun: function(migrations, lastMigrationTimestamp) {
        return _.reduce(migrations, function(migrationsAcc, migration) {
            if (migration.timestamp > lastMigrationTimestamp) {
                migrationsAcc.push(migration);
            }

            return migrationsAcc;

        }, []);
    },
    runMigrations: function(migrations, lastMigrationTimestamp, endCb) {
        var migrationToRun;

        if (migrations.length === 0) {
            endCb(lastMigrationTimestamp);
            return;
        }

        migrationToRun = migrations[0];

        migrator.runMigration(migrationToRun, function(err) {
            if (!err) {
                lastMigrationTimestamp = migrationToRun.timestamp;
                migrator.runMigrations(migrations.slice(1), lastMigrationTimestamp, endCb);
            } else {
                endCb(lastMigrationTimestamp);
            }
        });
    },
    run: function() {
        migrator.getLastMigrationTimestamp(function(lastMigrationTimestamp) {
            var migrationsToRun = migrator.migrationsToRun(migrations, lastMigrationTimestamp);
            migrator.runMigrations(migrationsToRun, lastMigrationTimestamp, function(lastMigrationTimestamp) {
                migrator.updateMigrationTimestamp(lastMigrationTimestamp, function() {
                    mysql.end();
                });
            });
        });
    }
};

installer = {
    run: function() {
        migrator.run();
    }
};

installer.run();




