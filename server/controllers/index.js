var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get();

      // console.log('Get request recieved for messages in controller')


    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //models posts data to database
      models.messages.post(req.body);
      res.end('sucessful post for messages');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get();
    },
    post: function (req, res) {
      //models posts data to database
      models.users.post(req.body);
      res.end('successful post for users');


    }
  }
};

