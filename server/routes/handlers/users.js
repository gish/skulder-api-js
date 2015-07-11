var Users = require('./../../models/users.js');

module.exports = {
    /***********************
     * POST users
     ***********************/
    post: function(request, reply) {
        var user = {
            email: request.payload.email,
            name: request.payload.name
        };

        try {
            Users.validate(user);
        } catch(e) {
            reply(e.message).code(400);
            return;
        }

        Users.add(user, function(user) {
            reply(user).code(201);
        });
    },

    /***********************
     * GET users
     ***********************/
    get: function(request, reply) {
        var user = Users.get(request.params.id, function(user) {
            if (!user) {
                reply().code(404);
            } else {
                reply(user);
            }
        });
    },

    /***********************
     * GET users
     ***********************/
    getTransactions: function(request, reply) {
        Users.getTransactions(request.params.id, function(transactions) {
            reply(transactions);
        });
    }
};
