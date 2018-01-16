/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;
var db = require('../db');

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat',
      multipleStatements: true
    });
    dbConnection.connect();

    dbConnection.query('SET FOREIGN_KEY_CHECKS=0; truncate users; truncate messages; truncate rooms; truncate friends; SET FOREIGN_KEY_CHECKS=1; ', done);

  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'main'
        }
      }, function () {
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          expect(results.length).to.equal(1);
          expect(results[0].messageText).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    db.roomPost('main', function(){
      db.userPost('chickenface', function() {
        db.messagePost('chickenface', 'You have the face of an elephant.', 'main', function(){
          db.messagePost('chickenface', 'You have the face of a chicken.', 'main', function() {
            request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
              var messageLog = JSON.parse(body);
              expect(messageLog[0].messageText).to.equal('You have the face of an elephant.');
              expect(messageLog[0].roomname).to.equal('main');
              done();
            });
          });
        });
      });
    });
  });
});
