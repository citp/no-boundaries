const { Ci, Cu, Cr}        = require("chrome");
const events            = require("sdk/system/events");
const pageMod           = require("sdk/page-mod");
const data              = require("sdk/self").data;
var loggingDB           = require("./loggingdb.js");
var socket              = require("./socket.js");

Cu.import("resource://gre/modules/Services.jsm");

exports.run = function(config) {

  /*
   * Filter functions to apply to requests
   */
  function dropAllRequests(reqEvent) {
    var channel = reqEvent.subject;
    if (!(channel instanceof Ci.nsIHttpChannel)) {
      return;
    }
    loggingDB.logDebug("Dropping request: " + channel.URI.spec);
    channel.cancel(Cr.NS_BINDING_ABORTED);
  }


  var supportedFilters = {
    'drop-all': dropAllRequests
  }

  var enabledFilters = {};
  events.on("http-on-modify-request", function(event) {
    Object.keys(enabledFilters).forEach(function(key) {
      enabledFilters[key](event);
    });
  }, true);

  /*
   * Interface for controlling filters
   */

  function processControlMsg(queue) {
    var msg = queue.shift();

    // check msg format, should be [controlMsg(string), filterName(string)]
    if (msg.length != 2) {
      loggingDB.logError("Incorrect control message format: " + JSON.stringify(msg));
      return;
    }

    // process message
    var controlMsg = msg[0];
    var filterName = msg[1];
    if (!(filterName in supportedFilters)) {
      loggingDB.logError("Unknown filter name: " + filterName);
      return;
    }
    if (controlMsg == 'enable') {
      if (filterName in enabledFilters) {
        loggingDB.logInfo("Filter " + filterName + " already enabled.");
        return;
      }
      loggingDB.logInfo("Enabling filter " + filterName);
      enabledFilters[filterName] = supportedFilters[filterName];
    } else if (controlMsg == 'disable') {
      if (!(filterName in enabledFilters)) {
        loggingDB.logInfo("Filter " + filterName + " already disabled.");
        return;
      }
      loggingDB.logInfo("Disabling filter " + filterName);
      delete enabledFilters[filterName];
    } else {
      loggingDB.logError("Unsupported control message: " + controlMsg);
    }
    return;
  }

  sock = new socket.ListeningSocket();
  loggingDB.logInfo("Starting request filter listener on port: " + sock.port);
  sock.startListening();
  sock.registerListener(processControlMsg);
  return sock.port;
}
