/*Crow Client ES6 Module v1.0.0*/
export var crow = (function() {
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
  })();