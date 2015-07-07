var fs = require('fs'),
    dbOptions,
    transactions;

module.exports = {
    init: function(options) {
        dbOptions = options;
    },
    load: function(cb) {
        var path = dbOptions.path;

        console.log('Loading transaction fixtures from', path);

        fs.readFile(path, function(err, data) {
            if (err) {
                console.error(err);
                throw new Error('Could not load transactions');
            }
            console.log('Transaction fixtures loaded');

            transactions = JSON.parse(data);

            cb(transactions);
        });
    },
    add: function() {
        // Stub
        return true;
    }
};
