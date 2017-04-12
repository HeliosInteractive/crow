"use strict"; //jshint ignore:line

var request;
var _url, _application;

/**
 * Send logs to woodpecker log server
 * @param {string} level
 * @param {string} message
 */
var crow = function(level) {

  if(!_url)
    throw new Error('set the url for crow with crow.setUrl(<url>)');

  if(!_application)
    throw new Error('set the application for crow with crow.setApplication(<application>)');

  if(!level)
    console.warn('no log level specified. Defaulting to info');//jshint ignore:line

  let message = Array.from(arguments).slice(1).reduce((last, next) => {
    if( typeof next !== 'object') return String.prototype.concat(last, ' ', next);
    return String.prototype.concat(last, ' ', JSON.stringify(next, null, 0));
  }, '');

  if(!message)
    throw new Error('log must contain a message');

  // Log to the log server
  request(_url, {
    application: _application,
    level: level,
    message: message
  });

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
crow.log = crow.info;
crow.warn = function (message) {
  crow('warn', message);
};
crow.error = function (message) {
  crow('error', message);
};
crow.fatal = function (message) {
  crow('fatal', message);
};
