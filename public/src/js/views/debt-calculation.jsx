
var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash');

module.exports = React.createClass({
    getDebt: function(transactions) {
        var users = this.props.users,
            highestDebt,
            userId,
            totalDebt = 0,
            debts = transactions.reduce(function(debts, transaction) {
                if (!debts[transaction.receiver]) {
                    debts[transaction.receiver] = 0;
                }
                debts[transaction.receiver] += transaction.amount;
                totalDebt += transaction.amount;

                return debts;
            }, {});

        for (userId in debts) {
            var userDebt = debts[userId],
                netDebt = userDebt - (totalDebt - userDebt);

            if (!(highestDebt && highestDebt.amount) || highestDebt.amount < netDebt) {
                highestDebt = {
                    amount: netDebt,
                    userId: userId
                };
            }
        }

        return highestDebt;
    },
    render: function() {
        var transactions = this.props.transactions,
            users = this.props.users,
            debt = this.getDebt(transactions),
            userName,
            amount;

        if (debt) {
            userName = _.find(users, function(user) {
                return user.id === debt.userId;
            }).name;
            amount = debt.amount / 100;
        } else {
            return (<div>Det är lika!</div>);
        }

        return (
            <div>{userName} är skyldig {amount} kr</div>
        );
    }
});
