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

exports.main = function(options, callbacks) {

  // Read the browser configuration from file
  var path = system.pathFor("ProfD") + '/browser_params.json';
  if (fileIO.exists(path)) {
    var config = JSON.parse(fileIO.read(path, 'r'));
    console.log("Browser Config:",config);
  } else {
    console.log("WARNING: config not found. Assuming this is a test run of",
                "the extension. Outputting all queries to console.");
    var config = {
      sqlite_address:null,
      leveldb_address:null,
      disable_webdriver_self_id:true,
      cookie_instrument:true,
      js_instrument:true,
      cp_instrument:true,
      http_instrument:true,
      save_javascript:true,
      fake_autofill:true,
      crawl_id:''
    };
  }

  loggingDB.open(config['sqlite_address'],
                 config['leveldb_address'],
                 config['crawl_id']);

  // Prevent the webdriver from identifying itself in the DOM. See #91
  if (config['disable_webdriver_self_id']) {
    console.log("Disabling webdriver self identification");
    pageMod.PageMod({
      include: "*",
      contentScriptWhen: "start",
      contentScriptFile: data.url("remove_webdriver_attributes.js")
    });
  }
  if (config['cookie_instrument']) {
    console.log("Cookie instrumentation enabled");
    cookieInstrument.run(config['crawl_id']);
  }
  if (config['js_instrument']) {
    console.log("Javascript instrumentation enabled");
    jsInstrument.run(config['crawl_id']);
  }
  if (config['cp_instrument']) {
    console.log("Content Policy instrumentation enabled");
    cpInstrument.run(config['crawl_id']);
  }
  if (config['http_instrument']) {
    console.log("HTTP Instrumentation enabled");
    httpInstrument.run(config['crawl_id'], config['save_javascript']);
  }
  if (config['fake_autofill']) {
    console.log("Fake autofill is enabled");
    fakeAutofill.run(config['crawl_id']);
  }
};
