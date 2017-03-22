/*Crow Client v1.0.0*/
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
    return function(uri, body) {
        var oReq = new XMLHttpRequest();
        oReq.open("POST", uri), oReq.setRequestHeader("Content-Type", "application/json"), 
        oReq.send(JSON.stringify(body));
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
  });