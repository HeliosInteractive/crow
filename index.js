"use strict"; //jshint ignore:line

var request;
var _url, _application;

/**
 * Send logs to woodpecker log server
 * @param {string} level
 * @param {string} message
 */
var crow = function(level, message) {

  if(!_url)
    throw new Error('set the url for crow with crow.setUrl(<url>)');

  if(!_application)
    throw new Error('set the application for crow with crow.setApplication(<application>)');

  if(!message)
    throw new Error('log must contain a message');

  if(!level)
    console.warn('no log level specified. Defaulting to info');//jshint ignore:line

  // Log to the log server
  request(_url, {
    application: _application,
    level: level,
    message: message
  });

  // Log to the console.
  // TODO restrict this to web only
  var consoleMessage = level.toUpperCase() + ' - ' + message;

  switch(level){
    case 'fatal':
      console.error(consoleMessage);//jshint ignore:line
      break;
    case 'error':
      console.error(consoleMessage);//jshint ignore:line
      break;
    case 'warn':
      console.warn(consoleMessage);//jshint ignore:line
      break;
    case 'info':
      console.info(consoleMessage);//jshint ignore:line
      break;
    default:
      console.log(consoleMessage);//jshint ignore:line
  }
};

crow.setUrl = function(url) {
  _url = url;
};

crow.setApplication = function(application) {
  _application = application;
};

crow.debug = function (message) {
  crow('debug', message);
};
crow.info = function (message) {
  crow('info', message);
};
crow.warn = function (message) {
  crow('warn', message);
};
crow.error = function (message) {
  crow('error', message);
};
crow.fatal = function (message) {
  crow('fatal', message);
};