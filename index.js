/* global Logger */
"use strict"; //jshint ignore:line

var crow = new Logger();
crow.createLogger = function(options) {
  return new Logger(options);
};
