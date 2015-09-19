var Snapshot = require('./snapshot.js');

var express = require('express');
var rest = express();
rest.listen(9000);

// Second parameter is optional, should be used if you want to add this resource
// to your existing express service
var snapshotService = new Snapshot({
  ip: '192.168.1.180',
  username: 'username',
  password: 'password'
}, rest);

// Adds resource /snapshot to the existing webserver at http://localhost:9000
snapshotService.start();
