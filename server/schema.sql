CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  FOREIGN KEY (userId)
    REFERENCES users(userId),
  messageText VARCHAR(140),
  roomID INT,
  FOREIGN KEY (roomID)
    REFERENCES rooms(roomID),
  createdAt DATE,
  updatedAt DATE
);

CREATE TABLE users (
  /* Describe your table here.*/
  userId INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), createdAt DATE
);

CREATE TABLE friends (
  userId INT,
  friendId INT,
  FOREIGN KEY (userId)
    REFERENCES users(userId),
  FOREIGN KEY (userId)
    REFERENCES users(userId),
);

CREATE TABLE rooms (
  roomID INT,
  roomname VARCHAR(20)
);

user SMALLINT UNSIGNED NOT NULL REFERENCES users(id),

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables. */

