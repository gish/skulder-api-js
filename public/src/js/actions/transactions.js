var Reflux = require('reflux'),
    superAgent = require('superagent'),
    url = '/api/v1/transactions',
    Actions;

Actions = Reflux.createActions({
    add: { children: ['completed'] }
});

Actions.add.listen(function(transaction) {
    var self = this;
    superAgent
        .post(url)
        .send(transaction)
        .end(function(resp) {
            self.completed();
        });
});

module.exports = Actions;
