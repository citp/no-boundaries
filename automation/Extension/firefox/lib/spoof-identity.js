const { Ci, Cu }        = require("chrome");
const events            = require("sdk/system/events");
const pageMod           = require("sdk/page-mod");
const data              = require("sdk/self").data;

Cu.import("resource://gre/modules/Services.jsm");

exports.run = function(config, testing) {

  // Content script portion of identity spoofing
  pageMod.PageMod({
    include: "*",
    contentScriptWhen: "start",
    contentScriptFile: data.url("spoof_identity_content.js"),
    contentScriptOptions: config
  });

  function shouldRedirect(URI) {
    // We need to redirect the Google API as it attempts
    // to alter our spoofed `window.gapi` if it exists
    return (URI.startsWith('https://apis.google.com/js/platform.js') ||
            URI.startsWith('http://apis.google.com/js/platform.js'));
  }

  function redirectToDummyScript(respEvent) {
    var channel = respEvent.subject;
    if (channel instanceof Ci.nsIHttpChannel && shouldRedirect(channel.URI.spec)) {
      var newResponse = "";
      if (testing) {
        newResponse = encodeURIComponent(
          "console.log('Replaced script " + channel.URI.spec + "!'); " +
          "window.script_replaced = true;")
      } else {
        var newResponse  = encodeURIComponent(
          "console.log('noop of " + channel.URI.spec + "!')");
      }
      var redirectURI = "data:text/html," + newResponse;
      channel.redirectTo(Services.io.newURI(redirectURI, null, null));
    }
  }

  // Intercept http requests if Google API spoofing enabled
  if (config['google']) {
    events.on("http-on-modify-request", function(event) {
      redirectToDummyScript(event);
    }, true);
  }
}
