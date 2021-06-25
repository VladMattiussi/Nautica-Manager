var express = require('express');
var app = express();
var mongoose = require('mongoose')
var path = require('path');

global.appRoot = path.resolve(__dirname);

var PORT = 3000;

mongoose.connect('mongodb://localhost/Nautic', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

var routes = require('./src/routes/nauticRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

const server = app.listen(PORT, function () {
    console.log('Node API server started on port '+PORT);
});

const io = require('socket.io')(server);

io.on('connection', function(socket){

    socket.nickname = "Anonimo";

    socket.on('change nickname', function(nickname){
        socket.nickname = nickname;
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', { nickname: socket.nickname, content: msg});
    });

});