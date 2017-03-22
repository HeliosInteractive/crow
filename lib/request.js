/**
 * Send a request via http or xhr
 */
var request = (function(uri, body) {
  "use strict";

  console.log('request called')
  /**
   * Sends a request via xhr for browsers
   * @param {string} uri
   * @param {object} body
   */
  var xhr = function(uri, body) {
    var oReq = new XMLHttpRequest();

    oReq.open("POST", uri);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(JSON.stringify(body));
  };

  /**
   * Sends a request via http for node
   * @param {string} uri
   * @param {object} body
   */
  var http = function(uri, body) {
    console.log('http');
  };

  /**
   * Creates a query string that can be POSTed
   * @param {object} body
   */
  function queryString(body) {
    var convertedBody = Object.keys(body).map(function(key) {
      return key + '=' + encodeURIComponent(body[key]);
    });

    return '?' + convertedBody.join('&');
  }
  console.log('got to the end')

  // Return either http(node) or xhr(browser)
  return xhr(uri, body);
});