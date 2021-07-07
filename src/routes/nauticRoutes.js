module.exports = function(app) {
    var nauticController = require('../controllers/nauticController');

    app.route('/')
        .get(nauticController.show_index);

    app.route('/api/sailors')
        .get(nauticController.list_sailors)
        .post(nauticController.add_sailor);

    app.route('/api/operators')
        .get(nauticController.list_operators).
        post(nauticController.add_operator);

    //app.route('/sailors')
        //.get(nauticController.show_sailors);

    //app.route('/operators')
        //.get(nauticController.show_operators);

    //app.route('/login')
        //.get(nauticController.show_login);

    //app.route('/register')
        //.get(nauticController.show_register);

    //app.route('/dashboard')
        //.get(nauticController.show_dashboard);

    //app.route('/chat')
        //.get(nauticController.show_chat);

    app.route('/api/sailors/:username')
        .post(nauticController.get_sailor).
        put(nauticController.update_sailor).
        delete(nauticController.delete_boat);

    app.route('/api/operators/:username')
        .post(nauticController.get_operator).
        put(nauticController.update_operator).
        delete(nauticController.delete_service);

    app.route('/chat/messages')
        .get(nauticController.list_chat).
        post(nauticController.update_chat);

};