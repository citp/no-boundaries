// TODO: WIP, does not seem to work at the moment. 
"use strict";

const { Cc, Ci } = require("chrome");
const tabs = require("sdk/tabs");
var passwordManager = Cc["@mozilla.org/login-manager;1"].getService(
    Ci.nsILoginManager
);

function writeTextToFile(text, filename) {
  var fileIO = require("sdk/io/file");
  var TextWriter = fileIO.open(filename, "w");
  if (!TextWriter.closed) {
    TextWriter.write(text);
    TextWriter.close();
  }
}

exports.run = function(crawlID) {
  var logs = "";
  var theConsoleListener = {
      observe:function(aMessage){
        logs = logs + aMessage.message + "\n";
        // writeTextToFile("\nLog : ", "/tmp/js.log");
        // writeTextToFile("\nLog : " + aMessage.message, "/tmp/js.log");
      },
      QueryInterface: function (iid) {
        if (!iid.equals(Components.interfaces.nsIConsoleListener) &&
              !iid.equals(Components.interfaces.nsISupports)) {
          throw Components.results.NS_ERROR_NO_INTERFACE;
          }
          return this;
      }
  };
  var aConsoleService = Cc["@mozilla.org/consoleservice;1"]
      .getService(Ci.nsIConsoleService);
  aConsoleService.registerListener(theConsoleListener);

  tabs.on('close', function(tab) {
    // this doesn't seem to fire
    writeTextToFile("CONSOLE LOGS" + logs, "/tmp/js.log");
    logs = "";
  });
};
