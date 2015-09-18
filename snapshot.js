var http = require('http');
var express = require('express');
var rest = express();

module.exports = {
  start: function (ip, port, user, pwd) {
    var camIp = ip;
    var camPort = port;
    var camUser = user;
    var camPwd = pwd;

    var htmlOptions = {
        host: camIp,
        port: camPort,
        path: '/cgi-bin/CGIProxy.fcgi?cmd=snapPicture&usr=' + camUser + '&pwd=' + camPwd
    };

    rest.get('/snapshot', function(req, res) {
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
                  path: regex.exec(htmlContent)[1].replace('../', '')
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
      htmlRequest.end();
    });

    rest.listen(process.env.PORT || 9000);
  }
}
