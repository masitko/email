var users = require('../../app/controllers/users.server.controller');
var gifs = require('../../app/controllers/gifs.server.controller');

module.exports = function(app) {
    app.route('/api/gifs')
            .get(gifs.list)
            .post(users.requiresLogin, gifs.create);
    app.route('/api/gifs/:gifId')
            .get(gifs.read)
            .put(users.requiresLogin, gifs.hasAuthorization, gifs.update)
            .delete(users.requiresLogin, gifs.hasAuthorization, gifs.delete);
    app.param('gifId', gifs.gifByID);
};
