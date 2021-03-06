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
            description: null,
            submitting: false
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
        this.setState({submitting: true});
        e.preventDefault();
    },

    render: function() {
        var senders = this.props.users || [],
            receivers = this.props.users || [],
            amount = this.state.amount,
            selectedSender = this.state.sender,
            description = this.state.description,
            fraction = this.state.fraction,
            submitButton,
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

        if (this.state.submitting) {
            submitButton = (<button className="btn btn-primary pull-right" disabled="disabled" type="submit">Lägger till</button>);
        } else {
            submitButton = (<button className="btn btn-primary pull-right" type="submit">Lägg till</button>);
        }


        return (
            <form method="post" onSubmit={this.onSubmit}>
                <h3>Lägg till skuld</h3>
                <div className="form-group form-group-sm">
                    <div>
                        <select className="form-control" onChange={this.onReceiverChange} value={this.state.receiver}>{receiverOptions}</select>
                    </div>
                </div>
                <div className="form-group form-group-sm">
                    <div>
                        <label>är skyldig</label>
                        <div className="input-group">
                            <input className="form-control" type="tel" value={fraction} onChange={this.onFractionChange} />
                            <span className="input-group-addon"> %</span>
                        </div>
                    </div>
                </div>
                <div className="form-group form-group-sm">
                    <div>
                        <label>av</label>
                        <div className="input-group">
                            <input className="form-control" type="tel" value={amount} onChange={this.onAmountChange} />
                            <span className="input-group-addon"> kr</span>
                        </div>
                    </div>
                </div>
                <div className="form-group form-group-sm">
                    <label>för</label>
                    <input className="form-control" type="text" value={description} onChange={this.onDescriptionChange} />
                </div>
                {submitButton}
            </form>
        );
    }
});
