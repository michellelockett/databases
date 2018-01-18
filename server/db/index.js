var mysql = require('mysql');
var connection = require('../../orm-resources/orm-chatter.js');
var Sequelize = require('sequelize');

var userPost = function(user) {
  connection.User.sync()
    .then(function() {
      return connection.User.create({username: user});
    })
    .catch(function(err) {
      console.log(err);
    });
};

var roomPost = function(room) {
  connection.Room.sync()
    .then(function() {
      return connection.Room.create({roomname: room});
    })
    .catch(function(err) {
      console.log(err);
    });
};

var getMessages = function(callback) {
  connection.Message.sync()
    .then(function() {
      return connection.db.query('SELECT * FROM Messages');
    })
    .then(function(messages) {
      callback(messages);
    })
    .catch(function(error) {
      console.log(error);
    });
};

var messagePost = function(message) {
  // console.log(message);
  connection.Message.sync()
    .then(function() {
      var userId = connection.User.findAll({
        attributes: ['id'],
        where: {
          username: message.username
        }
      });

      var roomId = connection.Room.findAll({
        attributes: ['id'],
        where: {
          roomname: message.roomname
        }
      });
      var result = [roomId, userId];
      return Sequelize.Promise.all(result);
    })
    .then(function(ids) {
      return connection.Message.create({messageText: message.messageText, user_id: ids[1], room_id: ids[0]});
    })
    .catch(function(err) {
      console.log(err);
    });
};

exports.roomPost = roomPost;
exports.getMessages = getMessages;
exports.messagePost = messagePost;
exports.userPost = userPost;