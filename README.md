# foscam-snapshot-nodejs
Simple nodeJS module to extract the snapshot image from CGI snapPicture HTML and serve it on a webservice

### Installation

From repository folder run:
```sh
$ npm install
```
In your script add:
```sh
var snapshot = require('./snapshot.js');

// Start webservice on http://localhost:9000/snapshot
snapshot.start('192.168.1.180', 88, 'username', 'password');
```
The image can then be retrieved at http://localhost:9000/snapshot

### Config
*snapshot.start* expects *cam IP address*, *cam port*, *username*, *password*

### Test

From repository folder run:
```sh
$ npm install
$ node test.js
```
