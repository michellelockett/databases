var Sequelize = require('sequelize');
var db = new Sequelize('chatter', 'root', '');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true
  }
});

var Room = db.define('Room', {
  roomname: {
    type: Sequelize.STRING,
    unique: true
  }
});

var Message = db.define('Message', {
  objectId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  messageText: Sequelize.STRING,
  room_id: {
    type: Sequelize.INTEGER,
    references: {
      // This is a reference to another model
      model: Room,

      // This is the column name of the referenced model
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,

    references: {
      model: User,
      key: 'id'
    }
  },
});


/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
User.sync();
Room.sync();
Message.sync();



exports.db = db;
exports.User = User;
exports.Room = Room;
exports.Message = Message;





