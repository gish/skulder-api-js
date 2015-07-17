var Reflux = require('reflux'),
    superAgent = require('superagent'),
    url = '/api/v1/transactions',
    Actions;

Actions = Reflux.createActions({
    add: { children: ['completed'] },
    load: { children: ['completed'] }
});

Actions.add.listen(function(transaction) {
    var self = this;
    superAgent
        .post(url)
        .send(transaction)
        .end(function(err, response) {
            self.completed(response.body);
        });
});

Actions.load.listen(function() {
    var self = this;
    superAgent
        .get(url)
        .end(function(err, response) {
            self.completed(response.body);
        });
});

module.exports = Actions;
