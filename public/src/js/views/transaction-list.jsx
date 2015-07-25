var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TransactionsActions = require('./../actions/transactions.js');

module.exports = React.createClass({
    onRemove: function(id) {
        TransactionsActions.remove(id);
    },

    render: function() {
        var self = this,
            users = this.props.users,
            transactions = this.props.transactions,
            transactionList;

        transactions = _.sortBy(transactions, function(t) {
            return (-1) * t.created_at;
        });

        transactionList = transactions.map(function(t) {
            var amount = t.amount / 100,
                description = t.description,
                receiverName,
                id = t.id,
                onRemove = function() {
                    self.onRemove(id);
                };

            receiverName = _.find(users, function(user) {
                return user.id === t.receiver;
            }).name;

            return (
                <tr key={id}>
                    <td>{receiverName}</td>
                    <td>{amount} kr</td>
                    <td>{description}</td>
                    <td><a className="btn btn-default btn-xs" onClick={onRemove}>&times;</a></td>
                </tr>
            );
        });

        return (
            <div>
                <h3>Transaktioner</h3>
                <table className="table table-striped table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Skuld</th>
                            <th>Beskrivning</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList}
                    </tbody>
                </table>
            </div>
        );
    }
});
