var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.getMessages(function(messages){
        callback(messages);
      });
    },
    post: function (message) {
      db.messagePost(message.username, message.message, message.roomname, function(){});
    }
  },

  users: {
    get: function () {
      console.log('Users get received by models');
    },
    post: function (user) {
      db.userPost(user.username, function(){});
    }
  },

  rooms: {
    get: function () {
      console.log('Rooms get received by models ');
    },
    post: function (room) {
      db.roomPost(room.roomname, function(){});
    }
  }
};

