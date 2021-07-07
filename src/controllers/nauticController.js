var mongoose = require('mongoose');
Sailor = require("../models/sailorModel.js")(mongoose);
Operator = require("../models/operatorModel.js")(mongoose);
Chat = require("../models/chatModel.js")(mongoose);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.show_index = function(req, res) {
    res.sendFile(appRoot  + '/www/index.html');
};

exports.show_sailors = function(req, res) {
    res.sendFile(appRoot  + '/www/sailors.html');
};

exports.show_operators = function(req, res) {
    res.sendFile(appRoot  + '/www/operators.html');
};

//exports.show_login = function(req, res) {
    //res.sendFile(appRoot  + '/www/login.html');
//};

exports.show_register = function(req, res) {
    res.sendFile(appRoot  + '/www/register.html');
};

exports.show_chat = function(req, res) {
    res.sendFile(appRoot  + '/www/chat.html');
};

exports.list_sailors = function(req, res) {
    Sailor.find({}, function(err, sailor) {
        if (err)
            res.send(err);
        res.json(sailor);
    });
};

exports.add_sailor = function(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    var new_sailor = new Sailor(req.body);
    new_sailor.save(function(err, sailor) {
        if (err) {
            res.send(err);
        }
        let token = jwt.sign({username: this.username }, config.secret, {expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: sailor });
    });
};

exports.add_operator = function(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    var new_operator = new Operator(req.body);
    new_operator.save(function(err, operator) {
        if (err) {
            res.send(err);
        }
        let token = jwt.sign({username: this.username }, config.secret, {expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: operator });
    });
};

exports.list_operators = function(req, res) {
    Operator.find({}, function(err, operator) {
        if (err)
            res.send(err);
        res.json(operator);
    });
};

exports.get_sailor = function(req, res) {

    Sailor.find({username:req.params.username}, function(err, sailor) {
        if (err) {
            res.send(err);
        }
        else{
            if(sailor[0]==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                let passwordIsValid = bcrypt.compareSync(req.body.password, sailor[0].password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
                let token = jwt.sign({ username: sailor.username }, config.secret, { expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: sailor });
            }
        }
    });
};

exports.get_operator = function(req, res) {

    Operator.find({username:req.params.username}, function(err, operator) {
        if (err)
            res.send(err);
        else{
            if(operator[0]==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                let passwordIsValid = bcrypt.compareSync(req.body.password, operator[0].password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
                let token = jwt.sign({ username: operator.username }, config.secret, { expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: operator });
            }
        }
    });
};

exports.show_dashboard = function(req, res) {
    res.sendFile(appRoot  + '/www/dashboard.html');
};

exports.update_sailor = function(req, res) {
    Sailor.findOneAndUpdate({username:req.params.username}, req.body, {new: true}, function(err, sailor) {
        if (err)
            res.send(err);
        else{
            if(sailor==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                res.json(sailor);
            }
        }
    });
};

exports.update_operator = function(req, res) {
    Operator.findOneAndUpdate({username:req.params.username}, req.body, {new: true}, function(err, operator) {
        if (err)
            res.send(err);
        else{
            if(operator==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                res.json(operator);
            }
        }
    });
};

exports.delete_boat = function (req, res) {
    Sailor.deleteOne({username:req.params.username}, function(err, result) {
        if (err)
            res.send(err);
        else{
            if(result.deletedCount==0){
                res.status(404).send({
                    description: 'Movie not found'
                });
            }
            else{
                res.json({ message: 'Task successfully deleted' });
            }
        }
    });
};


exports.delete_service = function (req, res) {
    Operator.deleteOne({username:req.params.username}, function(err, result) {
        if (err)
            res.send(err);
        else{
            if(result.deletedCount==0){
                res.status(404).send({
                    description: 'Movie not found'
                });
            }
            else{
                res.json({ message: 'Task successfully deleted' });
            }
        }
    });
};

exports.list_chat = function(req, res) {
    Chat.find({}, function(err, sailor) {
        if (err)
            res.send(err);
        res.json(sailor);
    });
};

exports.update_chat = function (req, res) {
    var new_chat = new Chat(req.body);
    new_chat.save(function(err, chat) {
        if (err) {
            res.send(err);
        }
        res.status(200).send({ chat: chat });
    });
}