var fs = require('fs'),
    _ = require('lodash'),
    dbOptions,
    transactions,
    _save;

_save = function() {
    var transactionData = JSON.stringify(transactions),
        path = dbOptions.path;

    fs.writeFile(path, transactionData, function(err, data) {
        console.log('Transaction file saved');
    });
};

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
    add: function(transaction) {
        transactions.push(transaction);
        this._save();
    },
    delete: function(id) {
        var index = _.findIndex(transactions, function(transaction) {
            return transaction.id === id;
        });

        if (index !== -1) {
            transactions.splice(index, 1);
        }
    }
};
