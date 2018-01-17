var models = require('../models');
var qs = require('query-string');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(function(messages){
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
        models.messages.post(qs.parse(message));
        res.end('successful post for messages');
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(users) {
        res.end(JSON.stringify(users));
      });
    },
    post: function (req, res) {
      var user = '';
      req.on('data', function(chunk) {
        user += chunk;
      });
      req.on('end', function() {
        models.users.post(user);
        res.end('successful post for users');
      });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get();
    },
    post: function (req, res) {
      var roomname = '';
      req.on('data', function(chunk) {
        roomname += chunk;
      });
      req.on('end', function() {
        models.rooms.post(roomname);
        res.end('successful post for rooms');
      });
    }
  }
};

