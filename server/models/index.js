var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(function(messages){
        callback(messages);
      });
    },
    post: function (message) {
      db.messagePost(message, function(){});
    }
  },

  users: {
    get: function (callback) {
      db.getUsers(function(users) {
        callback(users);
      });
    },
    post: function (user) {
      console.log(user);
      return db.userPost(user);
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

