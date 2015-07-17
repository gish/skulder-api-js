var React = require('react'),
    Reflux = require('reflux'),
    AddForm = require('./add-form.jsx'),
    TransactionList = require('./transaction-list.jsx'),
    TransactionsActions = require('./../actions/transactions.js'),
    TransactionsStore = require('./../stores/transactions.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TransactionsStore, 'onStoreUpdate')
    ],

    onStoreUpdate: function(transactions) {
        this.setState({ transactions: transactions });
    },

    getInitialState: function() {
        return {
            transactions: []
        };
    },

    componentDidMount: function() {
        TransactionsActions.load();
    },

    render: function() {
        var users = [{
                id: 'bdeb2ad9-9d46-4ad9-8b94-7c25703c0d5f',
                name: 'Åsa'
            },{
                id: 'aef3b631-5a22-4c21-a7dd-91d9bf965dc1',
                name: 'Erik'
            }];
        return (
            <div>
                <AddForm users={users} />
                <TransactionList transactions={this.state.transactions} users={users} />
            </div>
        );
    }
});
