# foscam-snapshot-nodejs
A simple nodeJS module to extract the snapshot image from CGI snapPicture HTML and serve it on a webservice.

Such a script became necessary after the introduction of a bug on FI9816P firmware 1.9.2.12, having snapPicture2 act like the old snapPicture, and returning an HTML page instead of the image itself. Reference: http://foscam.us/forum/fi9816p-broken-snappicture2-bug-t13482.html

The module should be working with all Foscam webcams supporting CGI snapPicture function.

### Installation

From repository folder run:
```sh
$ npm install
```
In your script add:
```sh
var Snapshot = require('./snapshot.js');

// Starts webservice on http://localhost:9000/snapshot
var snapshotService = new Snapshot({
  ip: '192.168.1.180',
  username: 'username',
  password: 'password'
});
snapshotService.start();
```
The image can then be retrieved at http://localhost:9000/snapshot

You can also pass an optional second argument when creating a Snapshot object, in order to extend an existing express REST service with the additional */snapshot* resource:
```sh
var express = require('express');
var myRESTObj = express();
myRESTObj.listen(1234);

var snapshotService = new Snapshot({
  ip: '192.168.1.180',
  username: 'username',
  password: 'password'
}, myRESTObj);
snapshotService.start();
```

### Config
*snapshot.start* expects *cam IP address*, *cam port*, *username*, *password*

### Test

From repository folder run the following after editing test.js with your own parameters:
```sh
$ npm install
$ node test.js
```
