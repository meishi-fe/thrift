/*
* @Author: lushijie
* @Date:   2018-08-23 14:56:12
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-23 16:06:54
*/
var thrift = require('thrift');
var thriftPool = require('node-thrift-pool');
var UserStorage = require('./gen-nodejs/UserStorage.js'),
    ttypes = require('./gen-nodejs/user_types');

// var connection = thrift.createConnection('localhost', 9090),
//     client = thrift.createClient(UserStorage, connection);

var client = thriftPool(thrift, UserStorage, {
  host: "localhost",
  port: 9090,
  idle_timeout: 10000
});


var user = new ttypes.UserProfile({
  uid: +new Date(),
  name: "Mark Slee",
});

// connection.on('error', function(err) {
//   console.error(err);
// });

client.store(user, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    client.getAll(function(err, response) {
      console.log('all user=', response);
      connection.end();
    });
  }
});
