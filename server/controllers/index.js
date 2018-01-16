var models = require('../models');

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
      models.messages.post(req.body);
      res.end('sucessful post for messages');
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get();
    },
    post: function (req, res) {
      models.users.post(req.body);
      res.end('successful post for users');
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get();
    },
    post: function (req, res) {
      models.rooms.post(req.body);
      res.end('successful post for users');
    }
  }
};

