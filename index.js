
var request;
/**
 * Send logs to woodpecker log server
 * @param {string} application
 * @param {string} level
 * @param {string} message
 */
var crow = function(application, level, message) {
  "use strict";
console.log(request);
  request('http://localhost:4000', {
    application: application,
    level: level,
    message: message
  });
  // call request
};

