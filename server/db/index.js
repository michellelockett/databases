var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});
connection.connect();

var messagePost = function(username, messageText, roomname, callback) {

  var userQ = '(SELECT userId FROM users WHERE username = \'' + username + '\')';
  var roomQ = '(SELECT roomId FROM rooms WHERE roomname = \'' + roomname + '\')';
  var insert = 'INSERT INTO messages (objectId, user_id, createdAt, updatedAt, messageText, room_id) VALUES(NULL, ' + userQ + ', NOW(), NULL, ' + mysql.escape(messageText) + ', ' + roomQ + ')';

  connection.query(insert, function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });
};

var userPost = function(username, callback) {
  var user = 'INSERT INTO users (userId, username, createdAt) VALUES(NULL, \'' + username + '\', NOW())';
  var queryArgs = [];

  connection.query(user, queryArgs, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
};

var roomPost = function(roomname, callback) {
  var room = 'INSERT INTO rooms (roomId, roomname) VALUES(NULL, \'' + roomname + '\')';
  var queryArgs = [];

  connection.query(room, queryArgs, function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });
};

var getMessages = function (callback) {

  var query = 'SELECT m.objectId, m.createdAt, m.updatedAt, m.messageText, u.username, r.roomname FROM messages m inner join users u on (m.user_id = u.userId) inner join rooms r on (r.roomId = m.room_id);';
  var queryArgs = [];

  connection.query(query, queryArgs, function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      callback(rows);
    }
  });
};

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.roomPost = roomPost;
exports.getMessages = getMessages;
exports.connection = connection;
exports.messagePost = messagePost;
exports.userPost = userPost;