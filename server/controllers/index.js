var models = require('../models');
var connection = require('../../orm-resources/orm-chatter.js');
var Sequelize = require('sequelize');
var qs = require('query-string');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      connection.Message.findAll()
        .then(function(messages){
          res.end(JSON.stringify(messages));
        });
    },

    // a function which handles posting a message to the database
    post: function (req, res) {
      var message = '';
      req.on('data', function(chunk) {
        message += chunk;
      });

      req.on('end', function() {
        message = qs.parse(message);

        Promise.all([
          connection.User.findAll({ where: { username: message.username }}),
          connection.Room.findAll({ where: { roomname: message.roomname }})
        ])
          .then(function(promises) {

            var UserId = promises[0][0].dataValues.id;
            var RoomId = promises[1][0].dataValues.id;

            return connection.Message.create({ messageText: message.messageText, roomname: message.roomname, username: message.username, UserId: UserId, RoomId: RoomId });
          })
          .then(function(mess) {
            
            message.objectId = mess.objectId;
            message.createdAt = mess.createdAt;

            res.end(JSON.stringify(message));
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      connection.User.findAll()
        .then(function(users){
          res.end(JSON.stringify(users));
        });

    },
    post: function (req, res) {
      var user = '';
      req.on('data', function(chunk) {
        user += chunk;
      });
      req.on('end', function() {
        connection.User.findOrCreate({where: {username: user}})
          .spread(function(user, wasCreated){
            res.end('successful post for user: ', JSON.stringify(user));
          });
      });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      connection.Room.findAll()
        .then(function(rooms){
          res.end(JSON.stringify(rooms));
        });
    },
    post: function (req, res) {
      var room = '';
      req.on('data', function(chunk) {
        room += chunk;
      });
      req.on('end', function() {
      connection.Room.findOrCreate({where: {roomname: room}})
        .spread(function(room, wasCreated) {
          if (wasCreated) {
            res.end('created new room');
          } else {
            res.end('this room exists');
          }
        });
      });
    }
  }
};

