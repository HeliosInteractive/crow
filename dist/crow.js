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
  var request = function(uri, body) {
    "use strict";
    console.log("request called");
    return console.log("got to the end"), function(uri, body) {
        console.log("in xhr");
        var oReq = new XMLHttpRequest();
        oReq.open("POST", uri), oReq.setRequestHeader("Content-Type", "application/json"), 
        oReq.send(JSON.stringify(body));
    }(uri, body);
}, request, crow = function(application, level, message) {
    "use strict";
    console.log(request), request("http://localhost:4000", {
        application: application,
        level: level,
        message: message
    });
};
    return crow;
  });