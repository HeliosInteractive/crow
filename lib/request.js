/**
 * Send a request via http or xhr
 */
var request = (function(uri, body, onSuccess, onFailure) {
  "use strict";

  /**
   * Sends a request via xhr for browsers
   * @param {string} uri
   * @param {object} body
   */
  var xhr = function(uri, body) {
    var oReq = new XMLHttpRequest();

    oReq.on("error", function (error) {
      console.error('Error connecting to woodpecker', error);//jshint ignore:line
    });

    oReq.open("POST", uri);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(JSON.stringify(body));
  };

  /**
   * Sends a request via http for node
   * @param {string} uri
   * @param {object} body
   */
  var http = function(uri, body) {
    var url = require('url');
    var parsedUrl = url.parse(uri);

    var http = require(parsedUrl.protocol === "https:" ? "https" : "http");

    var options = {
      host : parsedUrl.hostname,
      protocol : parsedUrl.protocol,
      port : parsedUrl.port,
      path : parsedUrl.path,
      headers: {'Content-Type': 'application/json'},
      method : 'POST'
    };

    var req = http.request(options);

    req.on('response',function(res){
      if(onSuccess && typeof onSuccess === 'function') {
        onSuccess({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          uri: uri,
          body: body
        });
      }
    });
    req.on('error',function(err){
      if(onFailure && typeof onFailure === 'function') {
        err.message += ' | Unable to send message: ' + JSON.stringify(body);
        onFailure(err);
      } else {
        console.error(err);
      }
    });

    req.write(JSON.stringify(body));
    req.end();
  };

  if(typeof XMLHttpRequest !== "undefined") // browser
    return xhr(uri, body);

  return http(uri, body);
});