var mysql = require('mysql');
var connection = require('../../orm-resources/orm-chatter.js');
var Sequelize = require('sequelize');

var userPost = function(user) {
  connection.User.sync()
    .then(function() {
      return connection.User.create({username: user});
      //connection.db.close();
    })
    .catch(function(err) {
      console.log(err);
      //connection.db.close();
    });
}

var roomPost = function(room) {
  connection.Room.sync()
  .then(function() {
    return connection.Room.create({roomname: room});
    // connection.db.close();
  })
  .catch(function(err) {
    console.log(err);
    //connection.db.close();
  });
}

var getMessages = function(callback) {
  connection.Message.sync()
    .then(function() {
      return connection.db.query("SELECT * FROM Messages");
    })
    .then(function(messages) {
      //connection.db.close();
      callback(messages);
    })
    .catch(function(error) {
      console.log(error);
      // connection.db.close();
    });
}

var messagePost = function(message) {
  // console.log(message);
  connection.Message.sync()
    .then(function() {
      var userId = connection.User.findAll({
        attributes: ['id'],
        where: {
          username: message.username
        }
      })

      var roomId = connection.Room.findAll({
        attributes: ['id'],
        where: {
          roomname: message.roomname
        }
      })
      var result = [roomId, userId];
      return Sequelize.Promise.all(result);
    })
    .then(function(ids) {

      console.log('<<<<<<<<<<<<<<<<<<<IN MESSAGE POST>>>>>>>>>>>>>>>>>>>>>>>');
      console.log(ids[0].dataValues, ids[1].dataValues);
      return connection.Message.create({messageText: message.messageText, user_id: ids[1], room_id: ids[0]});
      // connection.db.close();
    })
    .catch(function(err) {
      console.log(err);
    });
}

exports.roomPost = roomPost;
exports.getMessages = getMessages;
exports.messagePost = messagePost;
exports.userPost = userPost;