var React = require('react'),
    Reflux = require('reflux'),
    TransactionsActions = require('./../actions/transactions.js'),
    TransactionsStore = require('./../stores/transactions.js');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TransactionsStore, 'onStoreUpdate')
    ],

    onStoreUpdate: function() {
        this.setState(this.getInitialState());
    },

    getInitialState: function() {
        return {
            amount: 0,
            sender: (this.props.users[0] && this.props.users[0].id) || null,
            receiver: (this.props.users[1] && this.props.users[1].id) || null,
            description: null
        };
    },

    onSenderChange: function(e) {
        var sender = e.target.value;
        this.setState({sender: sender});
    },

    onReceiverChange: function(e) {
        var receiver = e.target.value;
        this.setState({receiver: receiver});
    },

    onAmountChange: function(e) {
        var amount = parseFloat(e.target.value, 10) || 0;
        this.setState({amount: amount});
    },

    onDescriptionChange: function(e) {
        var description = e.target.value;
        this.setState({description: description});
    },

    onSubmit: function(e) {
        TransactionsActions.add({
            sender: this.state.sender,
            receiver: this.state.receiver,
            description: this.state.description,
            amount: this.state.amount * 100
        });
        e.preventDefault();
    },

    render: function() {
        var senders = this.props.users || [],
            receivers = this.props.users || [],
            amount = this.state.amount,
            selectedSender = this.state.sender,
            description = this.state.description,
            senderOptions = senders.map(function(sender) {
                var id = sender.id,
                    name = sender.name;

                return (<option value={id} key={id}>{name}</option>);
            }),
            receiverOptions = receivers.map(function(receiver) {
                var id = receiver.id,
                    name = receiver.name;

                return (<option value={id} key={id}>{name}</option>);
            });

        return (
            <form method="post" onSubmit={this.onSubmit}>
                <select onChange={this.onReceiverChange} value={this.state.receiver}>{receiverOptions}</select>
                <select onChange={this.onSenderChange} value={this.state.sender}>{senderOptions}</select>
                <input type="text" placeholder="0 kr" value={amount} onChange={this.onAmountChange} />
                <input type="text" placeholder="En glass" value={description} onChange={this.onDescriptionChange} />
                <button type="submit">Lägg till</button>
            </form>
        );
    }
});
