/*Crow Client ES6 Module v1.0.0*/
export var crow = (function() {
 "use strict";

var request = function(uri, body) {
    return "undefined" != typeof XMLHttpRequest ? function(uri, body) {
        var oReq = new XMLHttpRequest();
        oReq.open("POST", uri), oReq.setRequestHeader("Content-Type", "application/json"), 
        oReq.send(JSON.stringify(body));
    }(uri, body) : function(uri, body) {
        var url = require("url"), parsedUrl = url.parse(uri), http = require("https:" === parsedUrl.protocol ? "https" : "http"), options = {
            host: parsedUrl.hostname,
            protocol: parsedUrl.protocol,
            port: parsedUrl.port,
            path: parsedUrl.path,
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }, req = http.request(options);
        req.write(JSON.stringify(body)), req.end();
    }(uri, body);
}, request, _url, _application, crow = function(level, message) {
    if (!_url) throw new Error("set the url for crow with crow.setUrl(<url>)");
    if (!_application) throw new Error("set the application for crow with crow.setApplication(<application>)");
    if (!message) throw new Error("log must contain a message");
    level || console.warn("no log level specified. Defaulting to info"), request(_url, {
        application: _application,
        level: level,
        message: message
    });
    var consoleMessage = level.toUpperCase() + " - " + message;
    switch (level) {
      case "fatal":
        console.error(consoleMessage);
        break;

      case "error":
        console.error(consoleMessage);
        break;

      case "warn":
        console.warn(consoleMessage);
        break;

      case "info":
        console.info(consoleMessage);
        break;

      default:
        console.log(consoleMessage);
    }
};

crow.setUrl = function(url) {
    _url = url;
}, crow.setApplication = function(application) {
    _application = application;
}, crow.debug = function(message) {
    crow("debug", message);
}, crow.info = function(message) {
    crow("info", message);
}, crow.warn = function(message) {
    crow("warn", message);
}, crow.error = function(message) {
    crow("error", message);
}, crow.fatal = function(message) {
    crow("fatal", message);
};
    return crow;
  })();