var React = require('react'),
    AddForm = require('./add-form.jsx');

module.exports = React.createClass({
    render: function() {
        var users = [{
                id: 'bdeb2ad9-9d46-4ad9-8b94-7c25703c0d5f',
                name: 'Åsa'
            },{
                id: 'aef3b631-5a22-4c21-a7dd-91d9bf965dc1',
                name: 'Erik'
            }];
        return (
            <AddForm users={users} />
        );
    }
});
