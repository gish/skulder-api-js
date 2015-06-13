var fs = require('fs');

fs.readFile('transactions.js', function(err, data) {
    try {
        JSON.parse(data);
    } catch(e) {
        fs.writeFile('transactions.json', JSON.stringify([]));
        console.log('Created transactions DB');
    }
});
