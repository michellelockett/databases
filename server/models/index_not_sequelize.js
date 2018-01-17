var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(function(messages){
        callback(messages);
      });
    },
    post: function (message) {
      db.messagePost(message.username, message.messageText, message.roomname, function(){});
    }
  },

  users: {
    get: function (callback) {
      db.getUsers(function(users) {
        callback(users);
      });
      console.log('Users get received by models');
    },
    post: function (user) {
      console.log(user);
      db.userPost(user, function(){});
    }
  },

  rooms: {
    get: function () {
      console.log('Rooms get received by models ');
    },
    post: function (roomname) {
      db.roomPost(roomname, function(){});
    }
  }
};

