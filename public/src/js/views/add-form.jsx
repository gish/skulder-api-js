var React = require('react'),
    Reflux = require('reflux'),
    _ = require('lodash'),
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
            amount: null,
            fraction: null,
            sender: (this.props.users[0] && this.props.users[0].id) || null,
            receiver: (this.props.users[1] && this.props.users[1].id) || null,
            description: null
        };
    },

    onReceiverChange: function(e) {
        var receiver = e.target.value,
            sender;

        // Assume only two users
        sender = _.reject(this.props.users, function(user) {
            return user.id === receiver;
        })[0].id;

        this.setState({
            sender: sender,
            receiver: receiver
        });
    },

    onAmountChange: function(e) {
        var amount = parseFloat(e.target.value, 10) || 0;
        this.setState({amount: amount});
    },

    onDescriptionChange: function(e) {
        var description = e.target.value;
        this.setState({description: description});
    },

    onFractionChange: function(e) {
        var fraction = e.target.value;
        this.setState({fraction: fraction});
    },

    onSubmit: function(e) {
        TransactionsActions.add({
            sender: this.state.sender,
            receiver: this.state.receiver,
            description: this.state.description,
            amount: this.state.amount * 100 * (this.state.fraction/100)
        });
        e.preventDefault();
    },

    render: function() {
        var senders = this.props.users || [],
            receivers = this.props.users || [],
            amount = this.state.amount,
            selectedSender = this.state.sender,
            description = this.state.description,
            fraction = this.state.fraction,
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
            <form method="post" className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                        <select className="form-control" onChange={this.onReceiverChange} value={this.state.receiver}>{receiverOptions}</select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2">Andel</label>
                    <div className="col-xs-10">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="50" value={fraction} onChange={this.onFractionChange} />
                            <span className="input-group-addon"> %</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2">Skuld</label>
                    <div className="col-xs-10">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="32" value={amount} onChange={this.onAmountChange} />
                            <span className="input-group-addon"> kr</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2">Vad som köptes</label>
                    <div className="col-xs-10">
                        <input className="form-control" type="text" placeholder="En glass" value={description} onChange={this.onDescriptionChange} />
                    </div>
                </div>
                <button className="btn btn-primary pull-right" type="submit">Lägg till</button>
            </form>
        );
    }
});
