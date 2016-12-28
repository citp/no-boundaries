const { Cu, Ci } = require("chrome");
const { gDevTools } = Cu.import("resource:///modules/devtools/gDevTools.jsm", {});
const {devtools} = Cu.import("resource://gre/modules/devtools/Loader.jsm", {});
Cu.import("resource://devtools/client/framework/gDevTools.jsm");
Cu.import("resource://gre/modules/Services.jsm");
var loggingDB = require("./loggingdb.js");
const data = require("sdk/self").data;
var crawlID = null;

function init(options, callbacks) {
  // Register event handler for console init
  gDevTools.on("webconsole-init", onConsoleInit);
  // Open devtools in a detached window, show Web Console panel.
  var toolbox = gDevTools.showToolbox(getTargetForSelectedTab(), "webconsole", "window");
}

function getTargetForSelectedTab() {
  let browserWindow = Services.wm.getMostRecentWindow("navigator:browser");
  let TargetFactory = devtools.TargetFactory;
  let target = TargetFactory.forTab(browserWindow.gBrowser.selectedTab);
  return target;
}

// This handler function has to be present
function onUnload(reason) {
}

/**
 * Console panel init handler.
 *
 * @param eventId ID of the event
 * @param toolbox Parent toolbox object
 * @param panelFrame Panel iframe
 */
function onConsoleInit(eventId, toolbox, panelFrame) {
  // Use the toolbox object and wait till the Console panel
  // is fully ready (panel frame loaded).
  toolbox.once("webconsole-ready", (eventId, panel) => {
    panel.hud.ui.on("new-messages", onNewMessages);
  });
}

function onNewMessages(topic, messages) {
  messages.forEach(msg => {
    onNewMessage(msg);
  });
}

function getMessageDetails(node){
  /*
   * This is an example console log message node content.
   * If we need to extract additional information from console messages,
   * we just need to query the "node" using querySelector(".CLASSNAME")
   *

   <span xmlns="
http: //www.w3.org/1999/xhtml" class="timestamp devtools-monospace">17:36:24.844 </span><span xmlns="http://www.w3.org/1999/xhtml" class="indent" style="width: 0px;" /><span xmlns="http://www.w3.org/1999/xhtml" class="icon" title="Error" /><a xmlns="http://www.w3.org/1999/xhtml" class="theme-twisty" href="#" title="Show/hide message details." /><span xmlns="http://www.w3.org/1999/xhtml" class="message-body-wrapper message-body devtools-monospace"><span>TypeError: window.FB.nonexistent_func is not a function</span>
    <ul class="stacktrace devtools-monospace">
        <li><span class="function"><span class="cm-variable">start_test</span>()</span><a href="http://localtest.me:8000/test_pages/js_error.html" draggable="false" target="jsdebugger" title="http://localtest.me:8000/test_pages/js_error.html" class="message-location theme-link"><span class="filename"> js_error.html</span><span class="line-number">:7</span></a></li>
        <li><span class="function"><span class="cm-variable">onload</span>()</span><a href="http://localtest.me:8000/test_pages/js_error.html" draggable="false" target="jsdebugger" title="http://localtest.me:8000/test_pages/js_error.html" class="message-location theme-link"><span class="filename"> js_error.html</span><span class="line-number">:1</span></a></li>
    </ul>
    </span><span xmlns="http://www.w3.org/1999/xhtml" value="1" class="message-repeats">1</span><a xmlns="http://www.w3.org/1999/xhtml" href="http://localtest.me:8000/test_pages/js_error.html" draggable="false" title="http://localtest.me:8000/test_pages/js_error.html" class="message-location theme-link devtools-monospace"><span class="filename"> js_error.html</span><span class="line-number">:7:17</span></a>

    */
  let messageBody = node.querySelector(".message-body");
  console.log(node.timestamp, messageBody.textContent);
}

function onNewMessage(msg) {
  let node = msg.node;  // Get DOM node associated with the message
  let category = node.getAttribute("category");
  let severity = node.getAttribute("severity");
  if ((category === "exception") && (severity === "error")) {
    // Let's keep the script location. clipboardText doesn't contain the full URL
    let location = node.querySelector(".message-location");
    let href = location ? location.getAttribute("href") : "";
    // Insert to DB
    let update = {};
    update["crawl_id"] = crawlID;
    update["time_stamp"] = new Date(node.timestamp).toISOString();
    update["script_url"] = loggingDB.escapeString(href);
    update["console_msg"] = loggingDB.escapeString(node.clipboardText);
    loggingDB.executeSQL(loggingDB.createInsert("console_errors", update), true);
  }
  // getMessageDetails(node); see the comment in the function body.
}

// Exports from this module
exports.onUnload = onUnload;
exports.run = function(aCrawlID) {
  // Set up the DB table
  var createConsoleErrorsTable = data.load("create_console_errors_table.sql");
  loggingDB.executeSQL(createConsoleErrorsTable, false);
  crawlID = aCrawlID;
  init();
}