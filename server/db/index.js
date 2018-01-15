var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});
connection.connect();

var messagePost = function(username, messageText, roomname, callback) {

  //connection.connect();

  //var mode = "SELECT @@SESSION.sql_mode; "
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

  //connection.end();
};

var userPost = function(username, callback) {

  //connection.connect();

  console.log('the db file recived the username: ', username);

  var user = 'INSERT INTO users (userId, username, createdAt) VALUES(NULL, \'' + username + '\', NOW())';
  var queryArgs = [];

  connection.query(user, queryArgs, function(err, rows, fields) {
    if (err) {
      throw err;
    } else {
      callback();
    }
  });

  //connection.end();
};

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = connection;
exports.messagePost = messagePost;
exports.userPost = userPost;