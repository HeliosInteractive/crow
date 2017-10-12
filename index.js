"use strict"; //jshint ignore:line

var request;
var _url, _application;
var _onSuccess, _onFailure;
var _devMode = false;

/**
 * Send logs to woodpecker log server
 * @param {string} level
 * @param {string} message
 */
var crow = function(level) {

  if(!_url && !_devMode)
    throw new Error('set the url for crow with crow.setUrl(<url>)');

  if(!_application && !_devMode)
    throw new Error('set the application for crow with crow.setApplication(<application>)');

  if(!level)
    console.warn('no log level specified. Defaulting to info');//jshint ignore:line

  var message = Array.from(arguments).slice(1).reduce(function(last, next){
    if( typeof next !== 'object') return String.prototype.concat(last, ' ', next);
    return String.prototype.concat(last, ' ', JSON.stringify(next, null, 0));
  }, '');

  if(!message)
    throw new Error('log must contain a message');

  // Log to woodpecker if not in dev mode
  if(!_devMode) {
    request(_url, {
      application: _application,
      level: level,
      message: message
    }, _onSuccess, _onFailure);
  }

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

crow.setDevMode = function(devMode) {
  if(typeof devMode !== 'boolean') {
    console.warn('setDevMode accepts a boolean value only. Leaving at default of false.');//jshint ignore:line
    return;
  }

  if(devMode) {
    console.warn('Warning: Crow has been set to dev mode. Logs will not be sent to woodpecker, and will only be logged to the console. This is your only warning.'); //jshint ignore:line
  }
  _devMode = devMode;
};

crow.debug = function () {
  crow('debug', arguments);
};
crow.info = function () {
  crow('info', arguments);
};
crow.log = crow.info;
crow.warn = function () {
  crow('warn', arguments);
};
crow.error = function () {
  crow('error', arguments);
};
crow.fatal = function () {
  crow('fatal', arguments);
};

Object.defineProperty(crow, 'onSuccess', {
  set: function(func) {
    _onSuccess = func;
  }
});

Object.defineProperty(crow, 'onFailure', {
  set: function(func) {
    _onFailure = func;
  }
});

