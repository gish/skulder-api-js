var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TransactionsActions = require('./../actions/transactions.js');

module.exports = React.createClass({
    onRemove: function(id) {
        TransactionsActions.remove(id);
    },

    render: function() {
        var transactions = this.props.transactions,
            self = this,
            transactionList;

        transactions = _.sortBy(transactions, function(t) {
            return (-1) * t.created_at;
        });

        transactionList = transactions.map(function(t) {
            var amount = t.amount / 100,
                description = t.description,
                receiver = t.receiver,
                id = t.id,
                onRemove = function() {
                    self.onRemove(id);
                };

            return (
                <tr key={id}>
                    <td>{receiver}</td>
                    <td>{amount}</td>
                    <td>{description}</td>
                    <td><a href="#" onClick={onRemove}>&times;</a></td>
                </tr>
            );
        });

        return (
            <table>
                {transactionList}
            </table>
        );
    }
});
