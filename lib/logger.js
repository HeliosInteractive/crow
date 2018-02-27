"use strict"; //jshint ignore:line

var request;

var Logger = function(options) {
  this.configure(options);
};

Logger.prototype.configure = function (options) {
  options = options || {};
  this.setApplication(options.application);
  this.setUrl(options.url);
  this.setDevMode(options.devMode || false);
};

Logger.prototype.setApplication = function(application) {
  this.application = application;
};

Logger.prototype.setUrl = function (url) {
  this.url = url;
};

Logger.prototype.setDevMode = function (devMode) {
  if(typeof devMode !== 'boolean') {
    console.warn('setDevMode accepts a boolean value only. Leaving at default of false.');//jshint ignore:line
    return;
  }
  if(devMode) {
    console.warn('Warning: Crow has been set to dev mode. Logs will not be sent to woodpecker, and will only be logged to the console. This is your only warning.'); //jshint ignore:line
  }
  this.devMode = devMode;
};

/**
 * Send logs to woodpecker log server
 * @param {string} level
 * @param {string} message
 */
Logger.prototype.emit = function(level) {
  if(!this.url && !this.devMode)
    throw new Error('set the url for crow with crow.setUrl(<url>)');

  if(!this.application && !this.devMode)
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
  if(!this.devMode) {
    request(this.url, {
      application: this.application,
      level: level,
      message: message
    }, this.onSuccess, this.onFailure);
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

Logger.prototype.debug = function () {
  this.emit('debug', arguments);
};
Logger.prototype.info = function () {
  this.emit('info', arguments);
};
Logger.prototype.log = Logger.prototype.info;
Logger.prototype.warn = function () {
  this.emit('warn', arguments);
};
Logger.prototype.error = function () {
  this.emit('error', arguments);
};
Logger.prototype.fatal = function () {
  this.emit('fatal', arguments);
};
