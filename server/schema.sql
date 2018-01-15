CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  /* Describe your table here.*/
  userId INT AUTO_INCREMENT,
  username VARCHAR(20) UNIQUE,
  createdAt DATE,
  PRIMARY KEY(userId)
);

CREATE TABLE friends (
  user_id INT,
  friend_id INT,
  FOREIGN KEY (user_id) REFERENCES users(userId),
  FOREIGN KEY (friend_id) REFERENCES users(userId)
);

CREATE TABLE rooms (
  roomId INT AUTO_INCREMENT,
  roomname VARCHAR(20),
  PRIMARY KEY(roomId)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  createdAt DATE,
  updatedAt DATE,
  messageText VARCHAR(140),
  room_id INT,
  PRIMARY KEY(objectId),
  FOREIGN KEY (user_id) REFERENCES users(userId),
  FOREIGN KEY (room_id) REFERENCES rooms(roomId)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables. */

