/*Crow Client v1.2.0*/
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

var request = function(uri, body, onSuccess, onFailure) {
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
        req.on("response", function(res) {
            onSuccess && "function" == typeof onSuccess && onSuccess({
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                uri: uri,
                body: body
            });
        }), req.on("error", function(err) {
            onFailure && "function" == typeof onFailure ? (err.message += " | Unable to send message: " + JSON.stringify(body), 
            onFailure(err)) : console.error(err);
        }), req.write(JSON.stringify(body)), req.end();
    }(uri, body);
}, request, Logger = function(options) {
    this.configure(options);
};

Logger.prototype.configure = function(options) {
    options = options || {}, this.setApplication(options.application), this.setUrl(options.url), 
    this.setDevMode(options.devMode || !1);
}, Logger.prototype.setApplication = function(application) {
    this.application = application;
}, Logger.prototype.setUrl = function(url) {
    this.url = url;
}, Logger.prototype.setDevMode = function(devMode) {
    if ("boolean" != typeof devMode) return void console.warn("setDevMode accepts a boolean value only. Leaving at default of false.");
    devMode && console.warn("Warning: Crow has been set to dev mode. Logs will not be sent to woodpecker, and will only be logged to the console. This is your only warning."), 
    this.devMode = devMode;
}, Logger.prototype.emit = function(level) {
    if (!this.url && !this.devMode) throw new Error("set the url for crow with crow.setUrl(<url>)");
    if (!this.application && !this.devMode) throw new Error("set the application for crow with crow.setApplication(<application>)");
    level || console.warn("no log level specified. Defaulting to info");
    var message = Array.from(arguments).slice(1).reduce(function(last, next) {
        return "object" != typeof next ? String.prototype.concat(last, " ", next) : String.prototype.concat(last, " ", JSON.stringify(next, null, 0));
    }, "");
    if (!message) throw new Error("log must contain a message");
    this.devMode || request(this.url, {
        application: this.application,
        level: level,
        message: message
    }, this.onSuccess, this.onFailure);
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
}, Logger.prototype.debug = function() {
    this.emit("debug", arguments);
}, Logger.prototype.info = function() {
    this.emit("info", arguments);
}, Logger.prototype.log = Logger.prototype.info, Logger.prototype.warn = function() {
    this.emit("warn", arguments);
}, Logger.prototype.error = function() {
    this.emit("error", arguments);
}, Logger.prototype.fatal = function() {
    this.emit("fatal", arguments);
};

var crow = new Logger();

crow.createLogger = function(options) {
    return new Logger(options);
};
    return crow;
  });