/*
* @Author: lushijie
* @Date:   2018-08-23 12:05:59
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-23 15:24:10
*/
var thrift = require('thrift');

var UserStorage = require('./gen-nodejs/UserStorage.js'),
    ttypes = require('./gen-nodejs/user_types');

var users = [];

var server = thrift.createServer(UserStorage, {
  store: function(user, cb) {
    users.push(user);
    cb(null);
  },

  retrieve: function(uid, cb) {
    cb(null, users.filter(u => {
      u.id = uid
    })[0]);
  },

  getAll: function(cb) {
    console.log(users);
    cb(null, users);
  }
});

server.listen(9090);