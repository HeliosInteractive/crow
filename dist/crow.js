/*Crow Client v1.0.4*/
(function(factory) {
    
    // Establish the root object, window (self) in the browser, or global on the server.
    // We use self instead of window for WebWorker support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof module == 'object' && module);

    // Set up crow appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
      define('crow', ['exports'], function(exports) {
        // Export global even in AMD case in case this script is loaded with
        // others that may still expect a global crow.
        root.crow = factory();
        // return crow for correct AMD use
        return root.crow;
      });

      // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        root.exports = factory();
      // Finally, as a browser global.
    } else {
      root.crow = factory();
    }

  })(function() {


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
}, request, _url, _application, crow = function(level) {
    if (!_url) throw new Error("set the url for crow with crow.setUrl(<url>)");
    if (!_application) throw new Error("set the application for crow with crow.setApplication(<application>)");
    level || console.warn("no log level specified. Defaulting to info");
    var message = Array.from(arguments).slice(1).reduce(function(last, next) {
        return "object" != typeof next ? String.prototype.concat(last, " ", next) : String.prototype.concat(last, " ", JSON.stringify(next, null, 0));
    }, "");
    if (!message) throw new Error("log must contain a message");
    request(_url, {
        application: _application,
        level: level,
        message: message
    });
    var consoleMessage = level.toUpperCase() + " - " + message;
    switch (level) {
      case "fatal":
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
}, crow.debug = function() {
    crow("debug", arguments);
}, crow.info = function() {
    crow("info", arguments);
}, crow.log = crow.info, crow.warn = function() {
    crow("warn", arguments);
}, crow.error = function() {
    crow("error", arguments);
}, crow.fatal = function() {
    crow("fatal", arguments);
};
    return crow;
  });