var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      console.log('Messages get received by models');
    }, // a function which produces all the messages
    post: function (message) {
      db.messagePost(message.username, message.message, message.roomname);
      // console.log('the model received the message: ', message);
    } // a function which can be used to insert a message into the database/
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('Users get received by models');
    },
    post: function (user) {
      // console.log('the model received the user: ', user);
      db.userPost(user.username);

    }
  }
};

