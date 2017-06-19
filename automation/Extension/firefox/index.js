const fileIO            = require("sdk/io/file");
const system            = require("sdk/system");
const pageMod           = require("sdk/page-mod");
const data              = require("sdk/self").data;
var loggingDB           = require("./lib/loggingdb.js");
var pageManager         = require("./lib/page-manager.js");
var cookieInstrument    = require("./lib/cookie-instrument.js");
var jsInstrument        = require("./lib/javascript-instrument.js");
var cpInstrument        = require("./lib/content-policy-instrument.js");
var httpInstrument      = require("./lib/http-instrument.js");
var fakeAutofill        = require("./lib/fake-autofill.js");
var spoofIdentity       = require("./lib/spoof-identity.js");
var consoleLogs         = require("./lib/console-logs.js");
var requestFilter       = require("./lib/request-filter.js");

const AUTOFILL_EMAIL = "randomtestuser.4321@gmail.com";
const AUTOFILL_PASSWORD = "_pa$$word123_";

exports.main = function(options, callbacks) {

  // Read the browser configuration from file
  var path = system.pathFor("ProfD") + '/browser_params.json';
  if (fileIO.exists(path)) {
    var config = JSON.parse(fileIO.read(path, 'r'));
    console.log("Browser Config:", config);
  } else {
    console.log("WARNING: config not found. Assuming this is a test run of",
                "the extension. Outputting all queries to console.");
    var config = {
      sqlite_address:null,
      leveldb_address:null,
      logger_address:null,
      disable_webdriver_self_id:true,
      spoof_identity: {
        'enabled': true,
        'facebook': true,
        'google': true,
        'dom_identity': true,
        'dom_login': false,
        'dom_checkout': false,
        'storage': true
      },
      cookie_instrument:true,
      js_instrument:true,
      cp_instrument:true,
      http_instrument:true,
      save_javascript:true,
      fake_autofill:true,
      testing:true,
      instrument_fbasyncinit:true,
      record_js_errors:true,
      crawl_id:''
    };
  }
  var listeningSockets = {}; // All listening sockets

  listeningSockets['loggingDB'] = loggingDB.open(config['sqlite_address'],
                                                 config['leveldb_address'],
                                                 config['logger_address'],
                                                 config['crawl_id']);
  listeningSockets['requestFilter'] = requestFilter.run();

  // Prevent the webdriver from identifying itself in the DOM. See #91
  if (config['disable_webdriver_self_id']) {
    loggingDB.logDebug("Disabling webdriver self identification");
    pageMod.PageMod({
      include: "*",
      contentScriptWhen: "start",
      contentScriptFile: data.url("remove_webdriver_attributes.js")
    });
  }

  // Spoof third-party social login services
  // NOTE: This *must* run before the http instrument as it registers an
  //       observer to spoof to redirect some script requests. Observers
  //       registered first will run last (so the http request observer will
  //       see the correct request).
  if (config['spoof_identity']['enabled']) {
    console.log("Spoofing Identity.");
    spoofIdentity.run(config['spoof_identity'], config['testing']);
  }
  if (config['cookie_instrument']) {
    loggingDB.logDebug("Cookie instrumentation enabled");
    cookieInstrument.run(config['crawl_id']);
  }
  if (config['js_instrument']) {
    loggingDB.logDebug("Javascript instrumentation enabled");
    jsInstrument.run(config['crawl_id'], config['testing'],
                     config['fake_autofill'], AUTOFILL_EMAIL,
                     AUTOFILL_PASSWORD, config['instrument_fbasyncinit']);
  }
  if (config['cp_instrument']) {
    loggingDB.logDebug("Content Policy instrumentation enabled");
    cpInstrument.run(config['crawl_id']);
  }
  if (config['http_instrument']) {
    loggingDB.logDebug("HTTP Instrumentation enabled");
    httpInstrument.run(config['crawl_id'], config['save_javascript']);
  }
  if (config['fake_autofill']) {
    console.log("Fake autofill is enabled");
    fakeAutofill.run(config['crawl_id'], AUTOFILL_EMAIL, AUTOFILL_PASSWORD);
  }
  if (config['record_js_errors']) {
    console.log("Console JS error recording enabled");
    consoleLogs.run(config['crawl_id']);
  }

  // Write listening sockets to disk for main process
  var path = system.pathFor("ProfD") + '/extension_sockets.json';
  console.log("Writing all listening socket ports to:", path);
  var file = fileIO.open(path, 'w');
  if (!file.closed) {
      file.write(JSON.stringify(listeningSockets));
      file.close();
      console.log("Sockets",listeningSockets,"written to disk.");
  }

};
