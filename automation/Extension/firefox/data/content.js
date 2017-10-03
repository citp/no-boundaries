
function getPageScript() {
  // Intrumentation injection code is based on privacybadgerfirefox
  // https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js

  // code below is not a content script: no Firefox APIs should be used

  // return a string
  return "(" + function () {
    // disable fingerprinting instrumentation not needed for the ID sniffing study
    const disableUnneededInstrumentation = true;

    // from Underscore v1.6.0
    function debounce(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function () {
        var last = Date.now() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            context = args = null;
          }
        }
      };

      return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    }
    // End of Debounce

    // messages the injected script
    var send = (function () {
      var messages = [];
      // debounce sending queued messages
      var _send = debounce(function () {
        document.dispatchEvent(new CustomEvent(event_id, {
          detail: messages
        }));

        // clear the queue
        messages = [];
      }, 100);

      return function (msgType, msg) {
        // queue the message
        messages.push({'type':msgType,'content':msg});
        _send();
      };
    }());

    var event_id = document.currentScript.getAttribute('data-event-id');

    /*
     * Instrumentation helpers
     */

    var testing = document.currentScript.getAttribute('data-testing') === 'true';

    function console_log(){
      if (testing){
        console.log.apply(console, arguments)
      }
    }

    console_log("Currently testing?",testing);

    // Recursively generates a path for an element
    function getPathToDomElement(element, visibilityAttr=false) {
      if(element == document.body)
        return element.tagName;
      if(element.parentNode == null)
        return 'NULL/' + element.tagName;

      var siblingIndex = 1;
      var siblings = element.parentNode.childNodes;
      for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling == element) {
          var path = getPathToDomElement(element.parentNode, visibilityAttr);
          path += '/' + element.tagName + '[' + siblingIndex;
          path += ',' + element.id;
          path += ',' + element.className;
          if (visibilityAttr) {
            path += ',' + element.hidden;
            path += ',' + element.style.display;
            path += ',' + element.style.visibility;
          }
          if(element.tagName == 'A')
            path += ',' + element.href;
          path += ']';
          return path;
        }
        if (sibling.nodeType == 1 && sibling.tagName == element.tagName)
            siblingIndex++;
      }
    }

    // Helper for JSONifying objects
    function serializeObject(object, stringifyFunctions=false) {
      if (object instanceof HTMLDocument){
        return "HTMLDocument - " + object.location;
      }
      // Handle permissions errors
      try {
        if(object == null)
          return "null";
        if(typeof object == "function") {
          if (stringifyFunctions)
            try{
              return object.toString();
            }catch (error) {
              return "FUNCTION SERIALIZATION ERROR: " + error;
            }
          else
            return "FUNCTION";
        }
        if(typeof object != "object")
          return String(object);
        var seenObjects = [];
        return JSON.stringify(object, function(key, value) {
          if (value instanceof HTMLDocument){
            return "HTMLDocument - " + value.location;
          }
          if(value == null)
            return "null";
          if(typeof value == "function") {
            if (stringifyFunctions){
              try{
                return value.toString();
              }catch (error) {
                return "JSON FUNCTION SERIALIZATION ERROR: " + error;
              }

            }else{
              return "FUNCTION";
            }
          }
          if(typeof value == "object") {
            // Remove wrapping on content objects
            if("wrappedJSObject" in value) {
              value = value.wrappedJSObject;
            }

            // Serialize DOM elements
            if(value instanceof HTMLElement)
              return getPathToDomElement(value);

            // Prevent serialization cycles
            if(key == "" || seenObjects.indexOf(value) < 0) {
              seenObjects.push(value);
              return value;
            }
            else
              return typeof value;
          }
          return value;
        });
      } catch(error) {
        console_log("SERIALIZATION ERROR: " + error);
        return "SERIALIZATION ERROR: " + error;
      }
    }

    function logErrorToConsole(error) {
      console_log("Error name: " + error.name);
      console_log("Error message: " + error.message);
      console_log("Error filename: " + error.fileName);
      console_log("Error line number: " + error.lineNumber);
      console_log("Error stack: " + error.stack);
    }

    // Helper to get originating script urls
    function getStackTrace() {
      var stack;

      try {
        throw new Error();
      } catch (err) {
        stack = err.stack;
      }

      return stack;
    }

    // from http://stackoverflow.com/a/5202185
    String.prototype.rsplit = function(sep, maxsplit) {
      var split = this.split(sep);
      return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
    }

    function getOriginatingScriptContext(getCallStack=false) {
      var trace = getStackTrace().trim().split('\n');
      // return a context object even if there is an error
      var empty_context = {scriptUrl: "",scriptLine: "",
                           scriptCol: "", funcName: "",
                           scriptLocEval: "", callStack: "" };
      if (trace.length < 4) {
        return empty_context;
      }
      // 0, 1 and 2 are OpenWPM's own functions (e.g. getStackTrace), skip them.
      var callSite = trace[3];
      if (!callSite){
        return empty_context;
      }
      /*
       * Stack frame format is simply: FUNC_NAME@FILENAME:LINE_NO:COLUMN_NO
       *
       * If eval or Function is involved we have an additional part after the FILENAME, e.g.:
       * FUNC_NAME@FILENAME line 123 > eval line 1 > eval:LINE_NO:COLUMN_NO
       * or FUNC_NAME@FILENAME line 234 > Function:LINE_NO:COLUMN_NO
       *
       * We store the part between the FILENAME and the LINE_NO in scriptLocEval
       */
      try{
        var scriptUrl = "";
        var scriptLocEval = ""; // for eval or Function calls
        var callSiteParts = callSite.split("@");
        var funcName = callSiteParts[0] || '';
        var items = callSiteParts[1].rsplit(":", 2);
        var columnNo = items[items.length-1];
        var lineNo = items[items.length-2];
        var scriptFileName = items[items.length-3] || '';
        var lineNoIdx = scriptFileName.indexOf(" line ");  // line in the URL means eval or Function
        if (lineNoIdx == -1){
          scriptUrl = scriptFileName;  // TODO: sometimes we have filename only, e.g. XX.js
        }else{
          scriptUrl = scriptFileName.slice(0, lineNoIdx);
          scriptLocEval = scriptFileName.slice(lineNoIdx+1, scriptFileName.length);
        }
        var callContext = {
          scriptUrl: scriptUrl,
          scriptLine: lineNo,
          scriptCol: columnNo,
          funcName: funcName,
          scriptLocEval: scriptLocEval,
          callStack: getCallStack ? trace.slice(3).join("\n").trim() : ""
        };
        return callContext;
      } catch (e) {
        console_log("Error parsing the script context", e, callSite);
        return empty_context;
      }
    }

    // Counter to cap # of calls logged for each script/api combination
    var maxLogCount = 500;
    var logCounter = new Object();
    function updateCounterAndCheckIfOver(scriptUrl, symbol) {
      var key = scriptUrl + '|' + symbol;
      if ((key in logCounter) && (logCounter[key] >= maxLogCount)) {
        return true;
      } else if (!(key in logCounter)) {
        logCounter[key] = 1;
      } else {
        logCounter[key] += 1;
      }
      return false;
    }

    // Prevent logging of gets arising from logging
    // Set to `true` while adding instrumentation to prevent logs.
    // Be sure to set to false at end of instrumentation.
    var inLog = true;

    // For gets, sets, etc. on a single value
    function logValue(instrumentedVariableName, value, operation, callContext, logSettings) {
      if(inLog)
        return;
      inLog = true;

      var overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedVariableName);
      if (overLimit) {
        inLog = false;
        return;
      }

      var serializedValue = serializeObject(value, !!logSettings.logFunctionsAsStrings);
      if (instrumentedVariableName.indexOf("Storage") != -1) {
        const maxStorageLength = 1024;
        serializedValue = serializedValue.substring(0, maxStorageLength);  // truncate JS value entries
      }

      var msg = {
        operation: operation,
        symbol: instrumentedVariableName,
        value: serializedValue,
        scriptUrl: callContext.scriptUrl,
        scriptLine: callContext.scriptLine,
        scriptCol: callContext.scriptCol,
        funcName: callContext.funcName,
        scriptLocEval: callContext.scriptLocEval,
        callStack: callContext.callStack,
        timeStamp: new Date().toISOString()
      };

      try {
        send('logValue', msg);
      }
      catch(error) {
        console_log("Unsuccessful value log!");
        logErrorToConsole(error);
      }

      inLog = false;
    }

    // For functions
    function logCall(instrumentedFunctionName, args, callContext, logSettings) {
      if(inLog)
        return;
      inLog = true;

      var overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedFunctionName);
      if (overLimit) {
        inLog = false;
        return;
      }

      try {
        // Convert special arguments array to a standard array for JSONifying
        var serialArgs = [ ];
        for(var i = 0; i < args.length; i++)
          serialArgs.push(serializeObject(args[i], !!logSettings.logFunctionsAsStrings));
        var msg = {
          operation: "call",
          symbol: instrumentedFunctionName,
          args: serialArgs,
          value: "",
          scriptUrl: callContext.scriptUrl,
          scriptLine: callContext.scriptLine,
          scriptCol: callContext.scriptCol,
          funcName: callContext.funcName,
          scriptLocEval: callContext.scriptLocEval,
          callStack: callContext.callStack,
          timeStamp: new Date().toISOString()
        }
        send('logCall', msg);
      }
      catch(error) {
        console_log("Unsuccessful call log: " + instrumentedFunctionName);
        logErrorToConsole(error);
      }
      inLog = false;
    }

    // Rough implementations of Object.getPropertyDescriptor and Object.getPropertyNames
    // See http://wiki.ecmascript.org/doku.php?id=harmony:extended_object_api
    Object.getPropertyDescriptor = function (subject, name) {
      var pd = Object.getOwnPropertyDescriptor(subject, name);
      var proto = Object.getPrototypeOf(subject);
      while (pd === undefined && proto !== null) {
        pd = Object.getOwnPropertyDescriptor(proto, name);
        proto = Object.getPrototypeOf(proto);
      }
      return pd;
    };

    Object.getPropertyNames = function (subject, name) {
      var props = Object.getOwnPropertyNames(subject);
      var proto = Object.getPrototypeOf(subject);
      while (proto !== null) {
        props = props.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
      }
      // FIXME: remove duplicate property names from props
      return props;
    };

    /*
     *  Direct instrumentation of javascript objects
     */

    function isObject(object, propertyName) {
      try {
        var property = object[propertyName];
      } catch(error) {
        return false;
      }
      if (property === null) { // null is type "object"
        return false;
      }
      return typeof property === 'object';
    }

    function instrumentObject(object, objectName, logSettings={}) {
      // Use for objects or object prototypes
      //
      // Parameters
      // ----------
      //   object : Object
      //     Object to instrument
      //   objectName : String
      //     Name of the object to be instrumented (saved to database)
      //   logSettings : Object
      //     (optional) object that can be used to specify additional logging
      //     configurations. See available options below.
      //
      // logSettings options (all optional)
      // -------------------
      //   propertiesToInstrument : Array
      //     An array of properties to instrument on this object. Default is
      //     all properties.
      //   excludedProperties : Array
      //     Properties excluded from instrumentation. Default is an empty
      //     array.
      //   logCallStack : boolean
      //     Set to true save the call stack info with each property call.
      //     Default is `false`.
      //   logFunctionsAsStrings : boolean
      //     Set to true to save functional arguments as strings during
      //     argument serialization. Default is `false`.
      //   preventSets : boolean
      //     Set to true to prevent nested objects and functions from being
      //     overwritten (and thus having their instrumentation removed).
      //     Other properties (static values) can still be set with this is
      //     enabled. Default is `false`.
      //   recursive : boolean
      //     Set to `true` to recursively instrument all object properties of
      //     the given `object`. Default is `false`
      //     NOTE:
      //       (1)`logSettings['propertiesToInstrument']` does not propagate
      //           to sub-objects.
      //       (2) Sub-objects of prototypes can not be instrumented
      //           recursively as these properties can not be accessed
      //           until an instance of the prototype is created.
      //   depth : integer
      //     Recursion limit when instrumenting object recursively.
      //     Default is `5`.
      var properties = logSettings.propertiesToInstrument ?
        logSettings.propertiesToInstrument : Object.getPropertyNames(object);
      for (var i = 0; i < properties.length; i++) {
        if (logSettings.excludedProperties &&
            logSettings.excludedProperties.indexOf(properties[i]) > -1) {
          continue;
        }
        // If `recursive` flag set we want to recursively instrument any
        // object properties that aren't the prototype object. Only recurse if
        // depth not set (at which point its set to default) or not at limit.
        if (!!logSettings.recursive && properties[i] != '__proto__' &&
            isObject(object, properties[i]) &&
            (!('depth' in logSettings) || logSettings.depth > 0)) {

          // set recursion limit to default if not specified
          if (!('depth' in logSettings)) {
            logSettings['depth'] = 5;
          }
          instrumentObject(object[properties[i]], objectName + '.' + properties[i], {
                'excludedProperties': logSettings['excludedProperties'],
                'logCallStack': logSettings['logCallStack'],
                'logFunctionsAsStrings': logSettings['logFunctionsAsStrings'],
                'preventSets': logSettings['preventSets'],
                'recursive': logSettings['recursive'],
                'depth': logSettings['depth'] - 1
          });
        }
        try {
          instrumentObjectProperty(object, objectName, properties[i], logSettings);
        } catch(error) {
          logErrorToConsole(error);
        }
      }
    }
    if (testing) {
      window.instrumentObject = instrumentObject;
    }

    // Log calls to a given function
    // This helper function returns a wrapper around `func` which logs calls
    // to `func`. `objectName` and `methodName` are used strictly to identify
    // which object method `func` is coming from in the logs
    function instrumentFunction(objectName, methodName, func, logSettings) {
      return function () {
        var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
        logCall(objectName + '.' + methodName, arguments, callContext, logSettings);
        return func.apply(this, arguments);
      };
    }

    // Log properties of prototypes and objects
    function instrumentObjectProperty(object, objectName, propertyName, logSettings={}) {

      // Store original descriptor in closure
      var propDesc = Object.getPropertyDescriptor(object, propertyName);
      if (!propDesc){
        console.error("Property descriptor not found for", objectName, propertyName, object);
        return;
      }

      // Instrument data or accessor property descriptors
      var originalGetter = propDesc.get;
      var originalSetter = propDesc.set;
      var originalValue = propDesc.value;

      // We overwrite both data and accessor properties as an instrumented
      // accessor property
      Object.defineProperty(object, propertyName, {
        configurable: true,
        get: (function() {
          return function() {
            var origProperty;
            var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);

            // get original value
            if (originalGetter) { // if accessor property
              origProperty = originalGetter.call(this);
            } else if ('value' in propDesc) { // if data property
              origProperty = originalValue;
            } else {
              console.error("Property descriptor for",
                            objectName + '.' + propertyName,
                            "doesn't have getter or value?");
              logValue(objectName + '.' + propertyName, "",
                  "get(failed)", callContext, logSettings);
              return;
            }

            // Log `gets` except those that have instrumented return values
            // * All returned functions are instrumented with a wrapper
            // * Returned objects may be instrumented if recursive
            //   instrumentation is enabled and this isn't at the depth limit.
            if (typeof origProperty == 'function') {
              return instrumentFunction(objectName, propertyName, origProperty, logSettings);
            } else if (typeof origProperty == 'object' &&
              !!logSettings.recursive &&
              (!('depth' in logSettings) || logSettings.depth > 0)) {
              return origProperty;
            } else {
              logValue(objectName + '.' + propertyName, origProperty,
                  "get", callContext, logSettings);
              return origProperty;
            }
          }
        })(),
        set: (function() {
          return function(value) {
            var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
            var returnValue;

            // Prevent sets for functions and objects if enabled
            if (!!logSettings.preventSets && (
                typeof originalValue === 'function' ||
                typeof originalValue === 'object')) {
              logValue(objectName + '.' + propertyName, value,
                  "set(prevented)", callContext, logSettings);
              return originalValue;
            }

            // set new value to original setter/location
            if (originalSetter) { // if accessor property
              returnValue = originalSetter.call(this, value);
            } else if ('value' in propDesc) { // if data property
              originalValue = value;
              returnValue = value;
            } else {
              console.error("Property descriptor for",
                            objectName + '.' + propertyName,
                            "doesn't have setter or value?");
              logValue(objectName + '.' + propertyName, value,
                  "set(failed)", callContext, logSettings);
              return value;
            }

            // log set
            logValue(objectName + '.' + propertyName, value,
                "set", callContext, logSettings);

            // return new value
            return returnValue;
          }
        })()
      });
    }

    /*
     * Start Instrumentation
     */
    // TODO: user should be able to choose what to instrument

    // Access to navigator properties
    var navigatorProperties = [ "appCodeName", "appName", "appVersion",
                                "buildID", "cookieEnabled", "doNotTrack",
                                "geolocation", "language", "languages",
                                "onLine", "oscpu", "platform", "product",
                                "productSub", "userAgent", "vendorSub",
                                "vendor", "getBattery" ];
    navigatorProperties.forEach(function(property) {
      instrumentObjectProperty(window.navigator, "window.navigator", property);
    });

    if (!disableUnneededInstrumentation) {

      // Access to screen properties
      //instrumentObject(window.screen, "window.screen");
      // TODO: why do we instrument only two screen properties
      var screenProperties =  [ "pixelDepth", "colorDepth" ];
      screenProperties.forEach(function(property) {
        instrumentObjectProperty(window.screen, "window.screen", property);
      });

      // Access to plugins
      var pluginProperties = [ "name", "filename", "description", "version", "length"];
        for (var i = 0; i < window.navigator.plugins.length; i++) {
        let pluginName = window.navigator.plugins[i].name;
        pluginProperties.forEach(function(property) {
          instrumentObjectProperty(
              window.navigator.plugins[pluginName],
              "window.navigator.plugins[" + pluginName + "]", property);
        });
      }

      // Access to MIMETypes
      var mimeTypeProperties = [ "description", "suffixes", "type"];
      for (var i = 0; i < window.navigator.mimeTypes.length; i++) {
        let mimeTypeName = window.navigator.mimeTypes[i].type;
        mimeTypeProperties.forEach(function(property) {
          instrumentObjectProperty(
              window.navigator.mimeTypes[mimeTypeName],
              "window.navigator.mimeTypes[" + mimeTypeName + "]", property);
        });
      }
    }

    // Name, localStorage, and sessionsStorage logging
    // Instrumenting window.localStorage directly doesn't seem to work, so
    // the Storage prototype must be instrumented instead. Unfortunately this
    // fails to differentiate between sessionStorage and localStorage. Instead,
    // you'll have to look for a sequence of a get for the localStorage object
    // followed by a getItem/setItem for the Storage object.
    var windowProperties = [ "name", "localStorage", "sessionStorage" ];
    windowProperties.forEach(function(property) {
      instrumentObjectProperty(window, "window", property);
    });
    instrumentObject(window.Storage.prototype, "window.Storage");

    // Access to document.cookie
    instrumentObjectProperty(window.document, "window.document", "cookie", {
      logCallStack: true
    });

    // Access to canvas
    if (!disableUnneededInstrumentation) {

      instrumentObject(window.HTMLCanvasElement.prototype,"HTMLCanvasElement");

      var excludedProperties = [ "quadraticCurveTo", "lineTo", "transform",
                                 "globalAlpha", "moveTo", "drawImage",
                                 "setTransform", "clearRect", "closePath",
                                 "beginPath", "canvas", "translate" ];
      instrumentObject(
          window.CanvasRenderingContext2D.prototype,
          "CanvasRenderingContext2D",
          {'excludedProperties': excludedProperties}
      );

      // Access to webRTC
      instrumentObject(window.RTCPeerConnection.prototype,"RTCPeerConnection");

      // Access to Audio API
      instrumentObject(window.AudioContext.prototype, "AudioContext");
      instrumentObject(window.OfflineAudioContext.prototype, "OfflineAudioContext");
      instrumentObject(window.OscillatorNode.prototype, "OscillatorNode");
      instrumentObject(window.AnalyserNode.prototype, "AnalyserNode");
      instrumentObject(window.GainNode.prototype, "GainNode");
      instrumentObject(window.ScriptProcessorNode.prototype, "ScriptProcessorNode");

      // Access to Battery API
      instrumentObject(window.BatteryManager.prototype, "BatteryManager");
    }

    /*
     * Third-party service instrumentation
     */

    // Instrument access to spoofed FB API (if exists)
    if (window.FB) {
      console_log("Instrumenting window.FB");
      instrumentObject(window.FB, "window.FB", {
        logFunctionsAsStrings: true,
        logCallStack: true,
        recursive: true
      });
    }

    // Instrument access/sets to window.fbAsyncInit (if exists)
    var instrument_fbasyncinit = document.currentScript.
      getAttribute('data-instrument-fbasyncinit') === 'true';
    if (instrument_fbasyncinit) {
      console_log("Instrumenting window.fbAsyncInit");

      // Define a no-op to allow us to instrument
      window.fbAsyncInit = function() {
        console_log("window.fbAsyncInit called!");
      };
      instrumentObjectProperty(window, "window", "fbAsyncInit", {
        logFunctionsAsStrings: true,
        logCallStack: true
      });
    }

    // Instrument access to our spoofed Google API (if exists)
    if (window.gapi) {
      console_log("Instrumenting window.gapi");
      instrumentObject(window.gapi, "window.gapi", {
        logFunctionsAsStrings: true,
        logCallStack: true,
        preventSets: true,
        recursive: true
      });
    }

    /*
     * Form insertion
     */

    // Check if element is visible and within the current viewport
    // From: http://stackoverflow.com/a/15203639/6073564
    function isElementVisible(el) {
      var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };

      // Return false if it's not in the viewport
      if (rect.right < 0 || rect.bottom < 0
            || rect.left > vWidth || rect.top > vHeight)
        return false;

      // Return true if any of its four corners are visible
      return (
            el.contains(efp(rect.left,  rect.top))
        ||  el.contains(efp(rect.right, rect.top))
        ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
      );
    }

    function addGUID(element) {
      var guid;
      if (element.hasAttribute('openwpm-guid'))
        return element.getAttribute('openwpm-guid');

      guid = Math.random();
      element.setAttribute("openwpm-guid", guid);
      return guid;
    }

    function checkElementProperties(element, callContext, elementType) {
      var data = {};
      var guid = addGUID(element);
      if (guid)
        data['guid'] = guid;
      data['scriptUrl'] = callContext.scriptUrl;
      data['scriptLine'] = callContext.scriptLine;
      data['scriptCol'] = callContext.scriptCol;
      data['callStack'] = callContext.callStack;
      data['isVisible'] = isElementVisible(element);
      data['nodePath'] = getPathToDomElement(element, true);
      var serializer = new XMLSerializer();
      data['serializedElement'] = serializer.serializeToString(element);
      data['elementType'] = elementType;
      var current_time = new Date();
      data["timeStamp"] = current_time.toISOString();
      return data;
    }

    document.addEventListener("DOMNodeInserted", function(ev) {
      inLog = true;
      let callContext = getOriginatingScriptContext(true);
      var target = ev.target;

      if (!target.tagName) {
        inLog = false;
        return;
      }

      if (target.tagName == 'FORM' ||
          target.tagName == 'INPUT') {
        var data = checkElementProperties(target, callContext, target.tagName);
        send('elementInserted', data);
        console_log('elementInserted',data);
      }

      // Search within the inserted Node
      function searchWithin(target, tagName) {
        var elements = target.getElementsByTagName(tagName);
        for (var i=0; i < elements.length; i++) {
          var data = checkElementProperties(elements[i], callContext, tagName);
          send('elementInserted', data);
          console_log('elementInserted',data);
        }
      }
      searchWithin(target, "FORM");
      searchWithin(target, "INPUT");
      inLog = false;
    }, false);

    document.addEventListener("DOMAttrModified", function(event) {
      if (inLog) {
        return;
      }
      inLog = true;
      let callContext = getOriginatingScriptContext(true);
      var target = event.target;

      if (!target.tagName) {
        inLog = false;
        return;
      }

      if (event.attrName == 'openwpm-guid') {
        inLog = false;
        return;
      }

      if (target.tagName == 'FORM' ||
          target.tagName == 'INPUT') {
        var data = checkElementProperties(target, callContext, target.tagName);
        data['attribute'] = event.attrName;
        data['prevValue'] = event.prevValue;
        data['newValue'] = event.newValue;
        send('elementModified', data);
        if (testing){
          console_log('elementModified', data);
        }
      }
      inLog = false;
    }, false);

    /*
     * Form reads
     */

    instrumentObject(window.HTMLInputElement.prototype, "window.HTMLInputElement",
        {
          logFunctionsAsStrings: true,
          logCallStack: true,
          excludedProperties: [ "nodeType", "nodeName", "parentNode", "checked",
                                "selectionStart", "selectionEnd", "offsetWidth",
                                "offsetHeight", "tagName", "getBoundingClientRect",
                                "className", "ownerDocument" ]
        });

    instrumentObject(window.HTMLFormElement.prototype, "window.HTMLFormElement",
        {
          logFunctionsAsStrings: true,
          logCallStack: true,
          excludedProperties: [ "nodeType", "nodeName", "parentNode",
                                "tagName", "contains", "getBoundingClientRect",
                                "className", "ownerDocument"]
        });

    /* Monitor new event listeners to top-level objects */

    var listenerLogSettings = {
          logFunctionsAsStrings: true,
          logCallStack: true,
          propertiesToInstrument: [ "addEventListener" ]
    };

    instrumentObject(window.HTMLBodyElement.prototype, "window.HTMLBodyElement",
        listenerLogSettings);

    instrumentObject(window.document, "window.document",
        listenerLogSettings);

    instrumentObject(window, "window",
        listenerLogSettings);

    /*
     * document.domain usage
     *
     * For motivation see Issue #98
     */
    instrumentObject(document, "document", {
      logCallStack: true,
      propertiesToInstrument: [ "domain" ]
    });

    /*
     * Credential Autofill
     */
    var fakeAutofill = document.currentScript.
      getAttribute('data-fakeAutofill') === 'true';
    if (fakeAutofill) {
      var autofillEmail = document.currentScript.
        getAttribute('data-autofillEmail');
      var autofillPassword = document.currentScript.
        getAttribute('data-autofillPassword');
      // `stringifyElement` and `stringifyForm` should replicate the stringify
      // functions in `automation/Commands/utils/webdriver_extensions`
      // See: https://github.com/englehardt/OpenWPM_Leuven_Princeton/blob/096bec53ab38d93e5b25fdcaba0f4d038e0e57b6/automation/Commands/utils/webdriver_extensions.py#L166-L206
      var stringifyElement = function(element) {
        return JSON.stringify({
          'tag_name': element.tagName,
          'type': element.type,
          'name': element.name,
          'value': element.value,
          'autocomplete': element.autocomplete,
          'placeholder': element.placeholder,
          'x': element.getBoundingClientRect().x,
          'y': element.getBoundingClientRect().y,
          'width': element.offsetWidth,
          'height': element.offsetHeight
        });
      }
      var stringifyForm = function(element) {
        return JSON.stringify({
          'tag_name': "Form",
          'name': element.name,
          'action': element.action,
          'method': element.method,
          'autocomplete': element.autocomplete,
          'x': element.getBoundingClientRect().x,
          'y': element.getBoundingClientRect().y,
          'width': element.offsetWidth,
          'height': element.offsetHeight
        });
      }
      document.addEventListener("change", function(event) {
        if (inLog) {
          return;
        }
        inLog = true;

        // Since `change` is a generic event, we want to filter anything that
        // isn't caused by the browser's autofill. Skip events when:
        // 1. Not an input element
        // 2. Value filled is not the autofill value.
        // 3. Call context isn't empty
        var target = event.target;
        if (!target || !target.tagName || target.tagName != 'INPUT' ||
            (target.value != autofillEmail && target.value != autofillPassword)) {
          inLog = false;
          return;
        }
        let callContext = getOriginatingScriptContext(true);
        if (callContext.callStack != "") {
          inLog = false;
          return;
        }

        // Stringify forms and log fill event
        var current_time = new Date();
        var data = {
          'elem_str': stringifyElement(target),
          'form_str': target.form ? stringifyForm(target.form) : "",
          'value': target.value,
          'time_stamp': current_time.toISOString()
        };
        send('autofillEvent', data);
        inLog = false;
        return;
      }, false);
    }

    // Enable logging
    inLog = false;

    console_log("Successfully started all instrumentation.");
  } + "());";
}


function insertScript(text, data) {
  var parent = document.documentElement,
    script = document.createElement('script');
  script.text = text;
  script.async = false;

  for (var key in data) {
    script.setAttribute('data-' + key.replace('_', '-'), data[key]);
  }

  parent.insertBefore(script, parent.firstChild);
  parent.removeChild(script);
}

function emitMsg(type, msg) {
  self.port.emit(type, msg);
}

var event_id = Math.random();

// listen for messages from the script we are about to insert
document.addEventListener(event_id, function (e) {
  // pass these on to the background page
  var msgs = e.detail;
  if (Array.isArray(msgs)) {
    msgs.forEach(function (msg) {
      emitMsg(msg['type'],msg['content']);
    });
  } else {
    emitMsg(msgs['type'],msgs['content']);
  }
});

insertScript(getPageScript(), {
  event_id: event_id,
  testing: self.options.testing,

  fakeAutofill: self.options.fakeAutofill,
  autofillEmail: self.options.autofillEmail,
  autofillPassword: self.options.autofillPassword,
  instrument_fbasyncinit: self.options.instrument_fbasyncinit
});