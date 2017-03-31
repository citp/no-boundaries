var pageMod = require("sdk/page-mod");
const data = require("sdk/self").data;
var loggingDB = require("./loggingdb.js");
var pageManager = require("./page-manager.js");

exports.run = function(crawlID, testing) {

  // Set up tables
  var createJavascriptTable = data.load("create_javascript_table.sql");
  loggingDB.executeSQL(createJavascriptTable, false);
  var createInsertedElementsTable = data.load("create_inserted_elements_table.sql");
  loggingDB.executeSQL(createInsertedElementsTable, false);
  var createModifiedElementsTable = data.load("create_modified_elements_table.sql");
  loggingDB.executeSQL(createModifiedElementsTable, false);

  // Inject content script to instrument JavaScript API
  pageMod.PageMod({
    include: "*",
    contentScriptWhen: "start",
    contentScriptFile: data.url("./content.js"),
    contentScriptOptions: {
      'testing': testing
    },
    onAttach: function onAttach(worker) {

      // Post-instrumentation filtering of records
      // Return true to prevent a record from being written to the database
      function dropRecord(data) {

        // window.addEventListener -- See Issue #11
        excludedEvents = ['unload', 'load', 'resize', 'scroll', 'beforeunload',
                          'popstate','test'];
        if (data.symbol && data.symbol == 'window.addEventListener') {
          return data.args && data.args.length >= 1 && excludedEvents.includes(data.args[0]);
        }

        // window.document.addEventListener -- See Issue #11
        excludedEvents = ['DOMContentLoaded','visibilitychange'];
        if (data.symbol && data.symbol == 'window.document.addEventListener') {
          return (data.args && data.args.length >= 1 && (
                excludedEvents.includes(data.args[0]) || data.args[0].startsWith('webdriver')));
        }

        // Not an excluded record
        return false;
      }

      function processCallsAndValues(data) {
        if (dropRecord(data)) {
          return;
        }

        var update = {};
        update["crawl_id"] = crawlID;
        update["script_url"] = loggingDB.escapeString(data.scriptUrl);
        update["script_line"] = loggingDB.escapeString(data.scriptLine);
        update["script_col"] = loggingDB.escapeString(data.scriptCol);
        update["func_name"] = loggingDB.escapeString(data.funcName);
        update["script_loc_eval"] = loggingDB.escapeString(data.scriptLocEval);
        update["call_stack"] = loggingDB.escapeString(data.callStack);
        update["symbol"] = loggingDB.escapeString(data.symbol);
        update["operation"] = loggingDB.escapeString(data.operation);
        update["value"] = loggingDB.escapeString(data.value);
        update["time_stamp"] = data.timeStamp;

        // Create a json object for function arguments
        // We create an object that maps array positon to argument
        // e.g. someFunc('a',123,'b') --> {0: a, 1: 123, 2: 'b'}
        // to make it easier to query the data, using something like the
        // sqlite3 json1 extension.
        var args = {};
        if (data.operation == 'call' && data.args.length > 0) {
          for(var i = 0; i < data.args.length; i++) {
            args[i] = data.args[i]
          }
          update["arguments"] = loggingDB.escapeString(JSON.stringify(args));
        }

        // document_url is the current frame's document href
        // top_level_url is the top-level frame's document href
        update["document_url"] = loggingDB.escapeString(worker.url);
        update["top_level_url"] = loggingDB.escapeString(worker.tab.url);

        loggingDB.executeSQL(loggingDB.createInsert("javascript", update), true);
      }
      worker.port.on("logCall", function(data){processCallsAndValues(data)});
      worker.port.on("logValue", function(data){processCallsAndValues(data)});
      worker.port.on("elementInserted", function(data) {
        var update = {};
        update["crawl_id"] = crawlID;
        update["script_url"] = loggingDB.escapeString(data.scriptUrl);
        update["script_line"] = loggingDB.escapeString(data.scriptLine);
        update["script_col"] = loggingDB.escapeString(data.scriptCol);
        update["call_stack"] = loggingDB.escapeString(data.callStack);
        update["node_path"] = loggingDB.escapeString(data.nodePath);
        update["is_visible"] = loggingDB.escapeString(data.isVisible);
        update["serialized_element"] = loggingDB.escapeString(data.serializedElement);
        update["element_type"] = loggingDB.escapeString(data.elementType);
        update["guid"] = loggingDB.escapeString(data.guid);
        update["time_stamp"] = loggingDB.escapeString(data.timeStamp);

        // document_url is the current frame's document href
        // top_level_url is the top-level frame's document href
        update["document_url"] = loggingDB.escapeString(worker.url);
        update["top_level_url"] = loggingDB.escapeString(worker.tab.url);

        loggingDB.executeSQL(loggingDB.createInsert("inserted_elements", update), true);
      });
      worker.port.on("elementModified", function(data) {
        var update = {};
        update["crawl_id"] = crawlID;
        update["script_url"] = loggingDB.escapeString(data.scriptUrl);
        update["script_line"] = loggingDB.escapeString(data.scriptLine);
        update["script_col"] = loggingDB.escapeString(data.scriptCol);
        update["call_stack"] = loggingDB.escapeString(data.callStack);
        update["node_path"] = loggingDB.escapeString(data.nodePath);
        update["serialized_element"] = loggingDB.escapeString(data.serializedElement);
        update["element_type"] = loggingDB.escapeString(data.elementType);
        update["attribute"] = loggingDB.escapeString(data.attribute);
        update["prev_value"] = loggingDB.escapeString(data.prevValue);
        update["new_value"] = loggingDB.escapeString(data.newValue);
        update["guid"] = loggingDB.escapeString(data.guid);
        update["time_stamp"] = loggingDB.escapeString(data.timeStamp);

        // document_url is the current frame's document href
        // top_level_url is the top-level frame's document href
        update["document_url"] = loggingDB.escapeString(worker.url);
        update["top_level_url"] = loggingDB.escapeString(worker.tab.url);

        loggingDB.executeSQL(loggingDB.createInsert("modified_elements", update), true);
      });
    }
  });
};
