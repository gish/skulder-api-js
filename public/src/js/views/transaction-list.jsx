var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TransactionsStore = require('./../stores/transactions.js');

module.exports = React.createClass({
    render: function() {
        var transactions = this.props.transactions,
            transactionList;

        transactions = _.sortBy(transactions, function(t) {
            return (-1) * t.created_at;
        });

        transactionList = transactions.map(function(t) {
            var amount = t.amount / 100,
                description = t.description,
                receiver = t.receiver,
                id = t.id;

            return (
                <tr key={id}>
                    <td>{receiver}</td>
                    <td>{amount}</td>
                    <td>{description}</td>
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
