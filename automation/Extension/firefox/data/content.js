
function getPageScript() {
  // Intrumentation injection code is based on privacybadgerfirefox
  // https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js

  // code below is not a content script: no Firefox APIs should be used

  // return a string
  return "(" + function () {
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

        // Handle permissions errors
        try {
            if(object == null)
                return "null";
            if(typeof object == "function") {
              if (stringifyFunctions)
                return object.toString();
              else
                return "FUNCTION";
            }
            if(typeof object != "object")
                return object;
            var seenObjects = [];
            return JSON.stringify(object, function(key, value) {
                if(value == null)
                    return "null";
                if(typeof value == "function") {
                  if (stringifyFunctions)
                    return value.toString();
                  else
                    return "FUNCTION";
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
        }
        catch(error) {
            console.log("SERIALIZATION ERROR: " + error);
            return "SERIALIZATION ERROR: " + error;
        }
    }

    function logErrorToConsole(error) {
      console.log("Error name: " + error.name);
      console.log("Error message: " + error.message);
      console.log("Error filename: " + error.fileName);
      console.log("Error line number: " + error.lineNumber);
      console.log("Error stack: " + error.stack);
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
          callStack: getCallStack ? trace.slice(3).join("\n") : ""
        };
        return callContext;
      }catch (e) {
        console.log("Error parsing the script context", e, callSite);
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
    var inLog = false;

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

      var msg = {
        operation: operation,
        symbol: instrumentedVariableName,
        value: serializeObject(value, !!logSettings.logFunctionsAsStrings),
        scriptUrl: callContext.scriptUrl,
        scriptLine: callContext.scriptLine,
        scriptCol: callContext.scriptCol,
        funcName: callContext.funcName,
        scriptLocEval: callContext.scriptLocEval,
        callStack: callContext.callStack
      };

      try {
        send('logValue', msg);
      }
      catch(error) {
        console.log("Unsuccessful value log!");
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
          callStack: callContext.callStack
        }
        send('logCall', msg);
      }
      catch(error) {
        console.log("Unsuccessful call log: " + instrumentedFunctionName);
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

    // Use for objects or object prototypes
    // Set the `prototype` flag for prototypes
    // logSettings options
    // -------------------
    //   propertiesToInstrument : Array
    //     An array of properties to instrument on this object. Default is all properties.
    //   excludedProperties : Array
    //     Properties excluded from instrumentation. Default is an empty array.
    //   logCallStack : boolean
    //     Set to true save the call stack info with each property call. Default is false.
    //   logFunctionsAsStrings : boolean
    //     Set to true to save functional arguments as strings during argument serialization. Default is false.
    function instrumentObject(object, objectName, prototype=false, logSettings={}) {
      var properties = logSettings.propertiesToInstrument ?
        logSettings.propertiesToInstrument : Object.getPropertyNames(object);
      for (var i = 0; i < properties.length; i++) {
        if (logSettings.excludedProperties &&
            logSettings.excludedProperties.indexOf(properties[i]) > -1) {
          continue;
        }
        if (prototype) {
          instrumentPrototypeProperty(object, objectName, properties[i], logSettings);
        } else {
          instrumentObjectProperty(object, objectName, properties[i], logSettings);
        }
      }
    }

    function instrumentObjectProperty(object, objectName, propertyName, logSettings={}) {
      try {
        var property = object[propertyName];
        if (typeof property == 'function') {
          logFunction(object, objectName, propertyName, logSettings);
        } else {
          logProperty(object, objectName, propertyName, logSettings);
        }
      } catch(error) {
        logErrorToConsole(error);
        }
      }

    function instrumentPrototypeProperty(object, objectName, propertyName, logSettings={}) {
      try {
        var property = object[propertyName];
        if (typeof property == 'function') {
          logFunction(object, objectName, propertyName, logSettings);
        }
      } catch(err) {
        // can't access static properties on prototypes
        logProperty(object, objectName, propertyName, logSettings);
      }
    }

    // Log calls to object/prototype methods
    function logFunction(object, objectName, method, logSettings) {
      var originalMethod = object[method];
      object[method] = function () {
        var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
        logCall(objectName + '.' + method, arguments, callContext, logSettings);
        return originalMethod.apply(this, arguments);
      };
    }

    // Log properties of prototypes and objects
    function logProperty(object, objectName, property, logSettings) {
      var propDesc = Object.getPropertyDescriptor(object, property);
      if (!propDesc){
        console.log("logProperty error", objectName, property, object);
        return;
      }
      // store the original getter in the closure
      var originalGetter = propDesc.get;
      var originalSetter = propDesc.set;
      // TODO what if the getter is undefined
      Object.defineProperty(object, property, {
        configurable: true,
        get: (function() {
          return function(){
            var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
            if (!originalGetter){
              console.log("originalGetter is undefined!", object, property);
              logValue(objectName + '.' + property, "", "get(failed)", callContext, logSettings);
              return;
            }
            var origProperty = originalGetter.call(this);
            logValue(objectName + '.' + property, origProperty, "get", callContext, logSettings);
            return origProperty;
          }

        })(),
        set: (function() {
         return function(value) {
           var callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
           if (!originalSetter) {
             logValue(objectName + '.' + property, value, "set(failed)", callContext, logSettings);
             return value;
           }
           logValue(objectName + '.' + property, value, "set", callContext, logSettings);
           return originalSetter.call(this, value);
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
        "buildID", "cookieEnabled", "doNotTrack", "geolocation", "language",
        "languages", "onLine", "oscpu", "platform", "product", "productSub",
        "userAgent", "vendorSub", "vendor" ];
    navigatorProperties.forEach(function(property) {
      instrumentObjectProperty(window.navigator, "window.navigator", property);
    });

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
        instrumentObjectProperty(window.navigator.plugins[pluginName],
            "window.navigator.plugins[" + pluginName + "]", property);
      });
    }

    // Access to MIMETypes
    var mimeTypeProperties = [ "description", "suffixes", "type"];
    for (var i = 0; i < window.navigator.mimeTypes.length; i++) {
      let mimeTypeName = window.navigator.mimeTypes[i].type;
      mimeTypeProperties.forEach(function(property) {
        instrumentObjectProperty(window.navigator.mimeTypes[mimeTypeName],
            "window.navigator.mimeTypes[" + mimeTypeName + "]", property);
      });
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
    instrumentObject(window.Storage.prototype, "window.Storage", true);

    // Access to canvas
    instrumentObject(window.HTMLCanvasElement.prototype,"HTMLCanvasElement", true);

    var excludedProperties = [ "quadraticCurveTo", "lineTo", "transform",
                               "globalAlpha", "moveTo", "drawImage",
                               "setTransform", "clearRect", "closePath",
                               "beginPath", "canvas", "translate" ];

    instrumentObject(window.CanvasRenderingContext2D.prototype,
        "CanvasRenderingContext2D", true, excludedProperties);

    // Access to webRTC
    instrumentObject(window.RTCPeerConnection.prototype,"RTCPeerConnection", true);

    // Access to Audio API
    instrumentObject(window.AudioContext.prototype, "AudioContext", true);
    instrumentObject(window.OfflineAudioContext.prototype, "OfflineAudioContext", true);
    instrumentObject(window.OscillatorNode.prototype, "OscillatorNode", true);
    instrumentObject(window.AnalyserNode.prototype, "AnalyserNode", true);
    instrumentObject(window.GainNode.prototype, "GainNode", true);
    instrumentObject(window.ScriptProcessorNode.prototype, "ScriptProcessorNode", true);

    /*
     * Third-party service instrumentation
     */

    // *** Facebook ***

    // User information used for Facebook
    var userInfo = {
      id: '558780400999395',
      email: 'Flo.Bar.12345@gmail.com',
      first_name: 'Florentino',
      last_name: 'Bartholomew',
      name: 'Florentino Bartholomew',
      birthday: '03/15/1989',
      religion: 'Christian',
      political: 'Republican',
      relationship_status: 'single',
      age_range: {
        min: 21,
        max: 35
      },
      age: 27,
      gender: 'male',
      is_verified: false,
      verified: false,
      currency: {
        currency_offset: 100,
        usd_exchange: 1,
        usd_exchange_inverse: 1,
        user_currency: "USD"
      },
      link: 'https://www.facebook.com/app_scoped_user_id/558780400999395/',
      locale: 'en_US',
      third_party_id: "qE9Wb92QGp0Yx9ggPifhhQCCAjo",
      timezone: -5
    };

    window.FB = {}; // Create a dummy FB in page script context
    window.FB.Event = {};

    // Fake authResponse that confirms user is logged-in to Facebook and
    // connected to this first-party's app. Note that the accessToken and
    // signedRequest aren't the correct lengths or format.
    authResponse = {
      status: 'connected',
      authResponse: {
          accessToken: 'U8vg8ZV00pRrZ2dJfb7S4hBnlL9lcwKvedNvdktnCbOh4gzmQ4HHsWYv41bjbr9f',
          expiresIn:'7022',
          signedRequest:'8EL2IVSYzwyD8Z16qPsTEbnUkd7MACokcqJgB9TPBs0TVr24fzRpl03oNwYc1870',
          userID: userInfo['id']
      }
    };

    window.FB.getLoginStatus = function getLoginStatus(callback) {
      callback(authResponse);
    };
    window.FB.getAuthResponse = function getAuthResponse() {
      return authResponse;
    };
    window.FB.Event.subscribe = function subscribe(ev, callback) {
      if (ev == 'auth.login' ||
          ev == 'auth.authResponseChange' ||
          ev == 'auth.statusChange')
        callback(authResponse);
      return undefined;
    };

    // FB.init requires an appId and will pop-up a box if the user isn't
    // currently authenticated. Third-parties are unlikely to use this.
    window.FB.init = function init(params) {
      console.log("Call to window.FB.init with params:", params);
      return;
    };

    // Provide false responses for data retrieval
    window.FB.api = function api() {
      // Can be called as:
      //    FB.api(path, method, params, callback)
      //    FB.api(path, params, callback)
      //    FB.api(path, method, callback)
      //    FB.api(path, callback)
      var path, method, params, callback = undefined;
      if (arguments.length == 4) {
        path = arguments[0];
        method = arguments[1];
        params = arguments[2];
        callback = arguments[3];
      } else if (arguments.length == 3) {
        path = arguments[0];
        if (typeof arguments[1] === "string" || arguments[1] instanceof String) {
          method = arguments[1];
        } else if (typeof arguments[1] === "object") {
          params = arguments[1];
        } else {
          console.log("Unexpected argument type for FB.api call:",arguments);
          return;
        }
        callback = arguments[2];
      } else if (arguments.length == 2) {
        path = arguments[0];
        callback = arguments[1];
      } else {
        console.log("Unexpected argument length for FB.api call:",arguments);
        return;
      }

      // Skip callback if not data retrieval
      if (method && method.toLowerCase() != 'get')
        return;

      var parts = path.toLowerCase().split('?');
      if (parts.length > 2)
        console.log("Unexpected path split in FB.api",parts);

      // Skip callback if not querying user data
      if (!parts[0].includes('me') && !parts[0].includes(userInfo['id']))
        return;

      // Parse fields
      var fields = ['id']; // all responses contain id
      if (parts.length >= 2 && parts[1].includes('fields')) {
        try {
          var qs = parts[1].split('&');
          for (i = 0; i < qs.length; i++) {
            if (qs[i].startsWith('fields')) {
              fields = fields.concat(qs[i].split('=')[1].replace(/ /g,'').split(','));
              break;
            }
          }
        } catch (error) {
          console.error("Unable to parse fields portion of path",path);
          logErrorToConsole(error);
        }
        console.log("FB.api fields found in path",fields);
      } else if (params && 'fields' in params) {
        fields = fields.concat(params['fields'].replace(/ /g,'').split(','));
        console.log("FB.api fields found in params",fields);
      } else {
        console.log("No fields found while parsing FB.api call");
        fields = fields.concat(['name']); // default response to '/me'
      };

      // Return user information for requested fields.
      // Facebook leaves unavailable fields blank, so we can do the same.
      // Alternatively we could return some random value for the field.
      var response = {};
      for (i = 0; i < fields.length; i++) {
        if (fields[i] in userInfo) {
          response[fields[i]] = userInfo[fields[i]];
        }
      };
      callback(response);
    };

    var fb_inited = function(){
      // Don't fire fbAsyncInit until the document is complete
      if (document.readyState !== "complete"){
        setTimeout(fb_inited, 50);
        return;
      }
      if (window.fbAsyncInit){
        console.log("Calling window.fbAsyncInit", window.fbAsyncInit);
        window.fbAsyncInit();
      }
    }

    // Since we overwrite FB object, window.fbAsyncInit never get called
    // We call it manually to trick fake a FB SDK init event
    setTimeout(fb_inited, 3000);

    //Instrument access to our fake FB API
    instrumentObject(window.FB, "window.FB", false, {
      excludedProperties: ['Event'],
      logFunctionsAsStrings: true,
      logCallStack: true
    });
    instrumentObject(window.FB.Event, "window.FB.Event", false, {
      logFunctionsAsStrings: true,
      logCallStack: true
    });

    /*
     * Form insertion
     */

    // Check if element is visible and within the current viewport
    // From: http://stackoverflow.com/a/15203639/6073564
    function isElementVisible(el) {
      var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || doc.documentElement.clientWidth,
        vHeight  = window.innerHeight || doc.documentElement.clientHeight,
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

    function checkFormProperties(form, callContext, elementType) {
      var data = {};
      data['scriptUrl'] = callContext.scriptUrl;
      data['scriptLine'] = callContext.scriptLine;
      data['scriptCol'] = callContext.scriptCol;
      data['callStack'] = callContext.callStack;
      data['isVisible'] = isElementVisible(form);
      data['nodePath'] = getPathToDomElement(form, true);
      var serializer = new XMLSerializer();
      data['serializedElement'] = serializer.serializeToString(form);
      data['elementType'] = elementType;
      send('formInserted', data)
      console.log("formInserted",data);
    }

    // NOTE: The current instrumentation may not have all of the properties if
    // script were to first add a form, and then add properties to that form
    // in separate calls.
    document.addEventListener("DOMNodeInserted", function (ev) {
      let callContext = getOriginatingScriptContext(true);

      var target = ev.target;
      var form_found = false;
      if (target.tagName == 'FORM') {
        checkFormProperties(target, callContext, "form");
        form_found = true;
      }
      var forms = target.getElementsByTagName('form');
      for (var i=0; i < forms.length; i++) {
        checkFormProperties(forms[i], callContext, "form");
        form_found = true;
      }
      if (!form_found){
        if (target.tagName == 'INPUT') {
          checkFormProperties(target, callContext, "input");
        }
        var inputs = target.getElementsByTagName('input');
        for (var i=0; i < inputs.length; i++) {
          checkFormProperties(inputs[i], callContext, "input");
        }
      }
    }, false);

    /*
     * Form reads
     */

    instrumentObject(window.HTMLInputElement.prototype, "window.HTMLInputElement",
        true,
        {
          logFunctionsAsStrings: true,
          logCallStack: true,
          excludedProperties: [ "nodeType", "nodeName", "parentNode", "checked",
                                "selectionStart", "selectionEnd", "offsetWidth" ,
                                "offsetHeight" ]
        });

    instrumentObject(window.HTMLFormElement.prototype, "window.HTMLFormElement",
        true,
        {
          logFunctionsAsStrings: true,
          logCallStack: true,
          excludedProperties: [ "nodeType", "nodeName", "parentNode",
                                "tagName", "contains", "getBoundingClientRect" ]
        });

    /* Monitor new event listeners to top-level objects */

    var listenerLogSettings = {
          logFunctionsAsStrings: true,
          logCallStack: true,
          propertiesToInstrument: [ "addEventListener" ]
    };

    instrumentObject(window.HTMLBodyElement.prototype, "window.HTMLBodyElement",
        true, listenerLogSettings);

    instrumentObject(window.document, "window.document",
        false, listenerLogSettings);

    instrumentObject(window, "window",
        false, listenerLogSettings);

    console.log("Successfully started all instrumentation.");
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
  event_id: event_id
});
