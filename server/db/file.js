var fs = require('fs'),
    dbOptions,
    transactions;

module.exports = {
    init: function(options) {
        dbOptions = options;
    },
    load: function(cb) {
        var path = dbOptions.path;

        console.log('Loading transaction file from', path);

        fs.readFile(path, function(err, data) {
            if (err) {
                console.error(err);
                throw new Error('Could not load transactions');
            }
            console.log('Transaction file loaded');

            transactions = JSON.parse(data);

            cb(transactions);
        });
    },
    save: function() {
        var transactionData = JSON.stringify(transactions),
            path = dbOptions.path;

        fs.writeFile(path, transactionData, function(err, data) {
            console.log('Transaction file saved');
        });
    },
};
