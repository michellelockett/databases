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
  roomname: Sequelize.STRING,
  username: Sequelize.STRING
});

//puts foreign key for the user in the message table
//gives .setUser() and .getUser();
Message.belongsTo(User);

//gives methods addMessage
// Instances of User will get the accessors getMessages and setMessages.
//This will add the attribute userId or user_id to User.

User.hasMany(Message, {as: 'Messages'});

Message.belongsTo(Room);

Room.hasMany(Message, {as: 'Messages'});

//User.belongsTo(User, { as: 'friends '});

var seed = function() {
  return db.sync({})
    .then(function() {
      return Promise.all([
        User.create({ username: "Michelle" }),
        User.create({ username: "Chickenface "}),
        Room.create({ roomname: "lobby" })
      ]);
    })
    .spread((michelle, chickenface, lobby) => {
      var userId = chickenface.get('id');
      var roomId = lobby.get('id');
      return Message.create({ UserId: chickenface.get('id'), messageText: 'you have the face of a chicken', RoomId: lobby.get('id'), username: michelle.username, roomname: lobby.roomname});
    })
    .then(message => console.log(message.dataValues));
};

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
seed()
  .then(function(result) {
    console.log('synced and seeded');
  });



exports.db = db;
exports.User = User;
exports.Room = Room;
exports.Message = Message;





