var http = require('http');

var options = {};
var rest;

var Snapshot = function(camOptions, restObj) {
    this.options = camOptions;

    if (restObj === undefined) {
        var express = require('express');
        this.rest = express();
        this.rest.listen(process.env.PORT || 9000);
    } else {
        this.rest = restObj;
    }
};

Snapshot.prototype.start = function () {
    if (this.options == {} || this.options === undefined)
        return;

    var camIp = this.options.ip;
    var camPort = this.options.port || 88;
    var camUser = this.options.username;
    var camPwd = this.options.password;

    var htmlOptions = {
        host: camIp,
        port: camPort,
        path: '/cgi-bin/CGIProxy.fcgi?cmd=snapPicture&usr=' + camUser + '&pwd=' + camPwd
    };

    this.rest.get('/snapshot', function(req, res) {
        var htmlContent = '';

        var htmlRequest = http.request(htmlOptions, function(htmlRes) {
            htmlRes.setEncoding('utf8');
            htmlRes.on('data', function (chunk) {
                htmlContent += chunk;
            });

            htmlRes.on('end', function () {
                var regex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
                var imgOptions = {
                    host: camIp,
                    port: camPort,
                    path: regex.exec(htmlContent)[1].replace('../', '/')
                };

                var imgRequest = http.get(imgOptions, function(imgRes){
                    var imgData = '';
                    imgRes.setEncoding('binary');
                    imgRes.on('data', function(chunk){
                        imgData += chunk
                    });

                    imgRes.on('end', function(){
                        res.writeHead(200, {
                            'Content-Type': 'image/jpg',
                            'Content-Length': imgData.length
                        });
                        res.end(imgData, 'binary');
                    });
                });
            });
        });
        htmlRequest.on('error', function (err) {
            console.log(err.message);
            res.sendStatus(503);
        });
        htmlRequest.end();
    });
};

module.exports = Snapshot;
