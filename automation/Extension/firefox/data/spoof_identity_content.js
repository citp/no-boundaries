function getPageScript() {
  // return a string
  return "(" + function() {

    var testing = document.currentScript.getAttribute('data-testing') === 'true';
    function console_log(){
      if (testing){
       console.log.apply(console, arguments)
      }
    }


    /*
     * Facebook Login API
     */

    var facebook = document.currentScript.getAttribute('data-facebook') === 'true';
    if (facebook) {
      // User information used for Facebook
      var FBUserInfo = {
        id: '558780400999395',
        email: 'will_tbone@hotmail.com',
        first_name: 'William',
        last_name: 'TBone',
        name: 'William TBone',
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
      var authResponse = {
        status: 'connected',
        authResponse: {
            accessToken: 'U8vg8ZV00pRrZ2dJfb7S4hBnlL9lcwKvedNvdktnCbOh4gzmQ4HHsWYv41bjbr9f',
            expiresIn:'7022',
            signedRequest:'8EL2IVSYzwyD8Z16qPsTEbnUkd7MACokcqJgB9TPBs0TVr24fzRpl03oNwYc1870',
            userID: FBUserInfo['id']
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
        console_log("Call to window.FB.init with params:", params);
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
            console_log("Unexpected argument type for FB.api call:",arguments);
            return;
          }
          callback = arguments[2];
        } else if (arguments.length == 2) {
          path = arguments[0];
          callback = arguments[1];
        } else {
          console_log("Unexpected argument length for FB.api call:",arguments);
          return;
        }

        // Skip callback if not data retrieval
        if (method && method.toLowerCase() != 'get')
          return;

        var parts = path.toLowerCase().split('?');
        if (parts.length > 2)
          console_log("Unexpected path split in FB.api",parts);

        // Skip callback if not querying user data
        if (!parts[0].includes('me') && !parts[0].includes(FBUserInfo['id']))
          return;

        // Parse fields
        var fields = ['id']; // all responses contain id
        if (parts.length >= 2 && parts[1].includes('fields')) {
          try {
            var qs = parts[1].split('&');
            for (var i = 0; i < qs.length; i++) {
              if (qs[i].startsWith('fields')) {
                fields = fields.concat(qs[i].split('=')[1].replace(/ /g,'').split(','));
                break;
              }
            }
          } catch (error) {
            console.error("Unable to parse fields portion of path",path);
            logErrorToConsole(error);
          }
          console_log("FB.api fields found in path",fields);
        } else if (params && 'fields' in params) {
          fields = fields.concat(params['fields'].replace(/ /g,'').split(','));
          console_log("FB.api fields found in params",fields);
        } else {
          console_log("No fields found while parsing FB.api call");
          fields = fields.concat(['name']); // default response to '/me'
        };

        // Return user information for requested fields.
        // Facebook leaves unavailable fields blank, so we can do the same.
        // Alternatively we could return some random value for the field.
        var response = {};
        for (var i = 0; i < fields.length; i++) {
          if (fields[i] in FBUserInfo) {
            response[fields[i]] = FBUserInfo[fields[i]];
          }
        };
        callback(response);
      };

      // No-op spoof other API methods
      window.FB.ui = function() { return; };
      window.FB.login = function() { return; };
      window.FB.logout = function() { return; };
      window.FB.Event.unsubscribe = function() { return; };
      window.FB.AppEvents = {}
      window.FB.AppEvents.LogEvent = function() { return; };
      window.FB.AppEvents.logPurchase = function() { return; };
      window.FB.AppEvents.activateApp = function() { return; };
      window.FB.XFBML = {};
      window.FB.XFBML.parse = function() { return; };
      window.FB.Canvas = {};
      window.FB.Canvas.Prefetcher = {};
      window.FB.Canvas.Prefetcher.addStaticResource = function() { return; };
      window.FB.Canvas.Prefetcher.setCollectionMode = function() { return; };
      window.FB.Canvas.scrollTo = function() { return; };
      window.FB.Canvas.setAutoGrow = function() { return; };
      window.FB.Canvas.setSize = function() { return; };
      window.FB.Canvas.setUrlHandler = function() { return; };
      window.FB.Canvas.setDoneLoading = function() { return; };
      window.FB.Canvas.startTimer = function() { return; };
      window.FB.Canvas.stopTimer = function() { return; };

      var fb_inited = function(){
        // Don't fire fbAsyncInit until the document is complete
        if (document.readyState !== "complete"){
          setTimeout(fb_inited, 50);
          return;
        }
        if (window.fbAsyncInit){
          console_log("Calling window.fbAsyncInit", window.fbAsyncInit);
          window.fbAsyncInit();
        }
      }

      // Since we overwrite FB object, window.fbAsyncInit never get called
      // We call it manually to trick fake a FB SDK init event
      setTimeout(fb_inited, 3000);

      console_log("Facebook API spoofed")
    }

    /*
     * Google and Google Plus Login API
     */

    var google = document.currentScript.getAttribute('data-google') === 'true';
    if (google) {
      // User information used for Google and Google Plus profile
      var GUserInfo = {
        'id': '101947710780300010678',
        'email': 'Flo.Bar.12345@gmail.com',
        'first_name': 'Florentino',
        'last_name': 'Bartholomew',
        'name': 'Florentino Bartholomew',
        'image_url': '"https://lh4.googleusercontent.com/-UqEcQyoiCHk/' +
          'AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8vzhLOBmQrGyD1teSBAuB4YvWhnJA/s96-c/' +
          'photo.jpg"',
      };

      // Google Plus only info
      var GPlusInfo = {
        'id': GUserInfo['id'],
        'kind': "plus#person",
        'objectType': "person",
        'isPlusUser': true,
        'etag': "\"qwejzoixvlmke529mc2djlONDH28/jlkj98DHHD723K01hH_Jf8\"",
        'url': "https://plus.google.com/" + GUserInfo['id'],
        'emails': [
         {
          'value': GUserInfo['email'],
          'type': "account"
         }
        ],
        'displayName': GUserInfo['name'],
        'name': {
         'familyName': GUserInfo['last_name'],
         'givenName': GUserInfo['first_name']
        },
        'nickname': "FloBar",
        'tagline': "Only the best survive",
        'aboutMe': "Find me at LLWbZxZS6C65oM7IaNGk",
        'image': {
         'url': GUserInfo['image_url'],
         'isDefault': true
        },
        'occupation': "A Student of Life",
        'gender': "male",
        'urls': [
         {
          'value': "http://LLWbZxZS6C65oM7IaNGk.com",
          'type': "other",
          'label': "The best LLWbZxZS6C65oM7IaNGk in town."
         }
        ],
        'language': "en",
        'birthday': "1980-04-01",
        'ageRange': {
         'min': 21,
         'max': 40
        },
        'organizations': [
         {
          'name': "Trump University",
          'title': "The Art of the Deal",
          'type': "school",
          'startDate': "2001",
          'endDate': "2004",
          'primary': false
         }
        ],
        'placesLived': [
         {
          'value': "Alabaster, Alabama",
          'primary': true
         },
         {
          'value': "Dayton, Louisiana"
         },
         {
          'value': "Monterey, California"
         }
        ],
        'circledByCount': 0,
        'verified': true
      };

      // A promise-like object that is always fulfilled immediately
      var Thenable = {}
      Thenable.then = function(onFulfilled, onRejected, context) {
        onFulfilled();
      };

      window.gapi = {};
      window.gapi.auth2 = {};
      window.gapi.client = {};

      // No-op spoof of common initialization methods
      window.gapi.client.init = function() {
        return Thenable;
      };
      window.gapi.client.load = function() {
        if (arguments.length == 3) {
          arguments[2](); // Call callback
        } else {
          return Thenable;
        }
      };
      window.gapi.client.setApiKey = function() {
        return;
      };

      // Google+ APIs
      // Full list: https://developers.google.com/apis-explorer/#search/plus/plus/v1/

      function generateResponse(contentLength) {
        // Fake response template used as a response to fake Request API
        return {
          'headers': {
            'Cache-Control': "private, max-age=0, must-revalidate, no-transform",
            'Content-Encoding': 'gzip',
            'Content-Length': contentLength,
            'Date': new Date().toUTCString(),
            'Expires': new Date().toUTCString(),
            'Content-Type': "application/json; charset=UTF-8",
            'Etag': "FFDKJie6cYw9BakjIIJFNNGVVdio/sdfg70qDT9rg2nj8zSasdfs_lFYYs",
            'Server': "GSE",
            'Vary': "X-Origin"
          },
          'status': 200,
          'statusText': "OK"
        };
      }

      function generateArgsForRequestAPI(apiResponse) {
        // Generate callback arguments used for both
        // * gapi.client.request().execute()
        // * gapi.client.request() with callback function
        var strOutput = JSON.stringify(apiResponse);
        var response = generateResponse(strOutput.length);
        response['body'] = strOutput;
        var rawResponse = {gapiRequest: {data: response}};
        rawResponse = JSON.stringify(rawResponse);
        return {'response': apiResponse, 'rawResponse': rawResponse};
      }

      function generateRequest(apiName, apiResponse) {
        // Fake Request object to serve fake REST response
        // apiName == 'people' uses response format for `people` API
        // apiName == 'request' uses response format for `request` API
        var Request = {};
        Request.then = function(onFulfilled, onRejected, context) {
          var strResponse = JSON.stringify(apiResponse);
          response = generateResponse(strResponse.length);
          response['body'] = strResponse;
          response['result'] = apiResponse;
          onFulfilled(response);
        }
        if (apiName === 'people') {
          Request.execute = function(callback) {
            // First returned argument contains a copy of the response in the
            // 'result' property. Kinda strange but maybe it's for compatibility
            // between Request.execute and Request.then?
            var response = JSON.parse(JSON.stringify(apiResponse));
            response['result'] = apiResponse;
            var rawResponse = {
              id: "gapiRpc",
              result: apiResponse
            };
            callback(response, JSON.stringify(rawResponse));
          }
        } else if (apiName === 'request') {
          Request.execute = function(callback) {
            var args = generateArgsForRequestAPI(apiResponse);
            callback(args['response'], args['rawResponse']);
          }
        } else {
          console.error("Unrecognized API type:",api);
        }
        return Request;
      }

      window.gapi.client.plus = {}
      window.gapi.client.plus.people = {};
      window.gapi.client.plus.people.get = function(params) {
        if (params && params['userId'] && (
              params['userId'] == 'me' || params['userId'] == GUserInfo['id'])) {
          // default is to return all available information
          if (!params['fields'])
            return generateRequest('people', GPlusInfo);
          var output = {};
          var parts = params['fields'].replace(/ /g,'').split(',');
          for (var i = 0; i < parts.length; i++) {
            if (parts[i] in GPlusInfo) {
              output[parts[i]] = GPlusInfo[parts[i]];
            }
          }
          return generateRequest('people', output);
        }
        return generateRequest('people',{});
      };

      // the `request` API is generic and allows queries to any google API
      // we want to spoof responses to the `plus/v1/people` endpoint.
      window.gapi.client.request = function(args) {
        // If not a request for user data, return an empty response
        if (!args['path'] || !(args['path'].includes('plus/v1/people/me') ||
              args['path'].includes('plus/v1/people/'+GUserInfo['id']))) {
          return generateRequest('request', {});
        }

        // Parse fields from params argument or from path
        var fields = null;
        if (args['params'] && 'fields' in args['params']) {
          fields = args['params']['fields'].replace(/ /g,'').split(',');
          console_log("gapi.client.request fields found in params",fields);
        } else if (args['path'].includes('?') && args['path'].includes('fields')) {
          try {
            var parts = args['path'].split('?')
            var qs = parts[1].split('&');
            for (var i = 0; i < qs.length; i++) {
              if (qs[i].startsWith('fields')) {
                fields = qs[i].split('=')[1].replace(/ /g,'').split(',');
                break;
              }
            }
            console_log("gapi.client.request fields found in path",fields);
          } catch (error) {
            console.error("Unable to parse fields portion of path",path);
            logErrorToConsole(error);
          }
        } else {
          console_log("gapi.client.request no fields found. Returning all.");
        }

        // Filter google API data by fields
        // by default, all fields are returned
        var output = {};
        if (fields != null) {
          for (var i = 0; i < fields.length; i++) {
            if (fields[i] in GPlusInfo) {
              output[fields[i]] = GPlusInfo[fields[i]];
            }
          }
        } else {
          output = GPlusInfo;
        }

        // Return directly if callback specified, otherwise return "Request"
        if (args['callback']) {
          var rargs = generateArgsForRequestAPI(output);
          args['callback'](rargs['response'], rargs['rawResponse']);
        } else {
          return generateRequest('request', output);
        }
      }

      // Google Sign-In APIs

      // gapi.auth2 spoofing
      window.gapi.auth2.init = function(params) {
        return window.gapi.auth2.GoogleAuth;
      };

      window.gapi.auth2.getAuthInstance = function() {
        return window.gapi.auth2.GoogleAuth;
      };

      // GoogleAuth
      window.gapi.auth2.GoogleAuth = {};
      window.gapi.auth2.GoogleAuth.currentUser = {};
      window.gapi.auth2.GoogleAuth.currentUser.get = function() {
        return window.gapi.auth2.GoogleUser;
      };
      window.gapi.auth2.GoogleAuth.currentUser.listen = function(listener) {
        listener(window.gapi.auth2.GoogleUser); // Immediately return user
      };
      window.gapi.auth2.GoogleAuth.isSignedIn = {};
      window.gapi.auth2.GoogleAuth.isSignedIn.get = function() {
        return true;
      };
      window.gapi.auth2.GoogleAuth.isSignedIn.listen = function(listener) {
        listener(true); // Immediately call listener as "signed in"
      };

      window.gapi.auth2.GoogleAuth.then = function(onInit) {
        onInit(window.gapi.auth2.GoogleAuth); // Immediately "resolve" promise
      };

      // GoogleUser
      window.gapi.auth2.GoogleUser = {};
      window.gapi.auth2.GoogleUser.getId = function() {
        return GUserInfo['id'];
      };
      window.gapi.auth2.GoogleUser.isSignedIn = function() {
        return true;
      };
      window.gapi.auth2.GoogleUser.getBasicProfile = function() {
        return window.gapi.auth2.BasicProfile;
      };

      // BasicProfile
      window.gapi.auth2.BasicProfile = {};
      window.gapi.auth2.BasicProfile.getId = function() {
        return GUserInfo['id'];
      };
      window.gapi.auth2.BasicProfile.getName = function() {
        return GUserInfo['name'];
      };
      window.gapi.auth2.BasicProfile.getGivenName = function() {
        return GUserInfo['first_name'];
      };
      window.gapi.auth2.BasicProfile.getFamilyName = function() {
        return GUserInfo['last_name'];
      };
      window.gapi.auth2.BasicProfile.getImageUrl = function() {
        return GUserInfo['image_url'];
      };
      window.gapi.auth2.BasicProfile.getEmail = function() {
        return GUserInfo['email'];
      };

      // No-op spoof remaining methods
      window.gapi.client.setApiKey = function() { return; };
      window.gapi.client.newBatch = function() { return; };
      window.gapi.client.Batch = {};
      window.gapi.client.Batch.add = function() { return; };
      window.gapi.client.Batch.then = function() { return; };
      window.gapi.client.Batch.execute = function() { return; };
      window.gapi.auth2.GoogleAuth.signIn = function() { return; };
      window.gapi.auth2.GoogleAuth.signOut = function() { return; };
      window.gapi.auth2.GoogleAuth.disconnect = function() { return; };
      window.gapi.auth2.GoogleAuth.grantOfflineAccess = function() { return; };
      window.gapi.auth2.GoogleAuth.attachClickHandler = function() { return; };
      window.gapi.auth2.GoogleUser.getHostedDomain = function() { return; };
      window.gapi.auth2.GoogleUser.getGrantedScopes = function() { return; };
      window.gapi.auth2.GoogleUser.getAuthResponse = function() { return; };
      window.gapi.auth2.GoogleUser.reloadAuthResponse = function() { return; };
      window.gapi.auth2.GoogleUser.hasGrantedScopes = function() { return; };
      window.gapi.auth2.GoogleUser.grant = function() { return; };
      window.gapi.auth2.GoogleUser.grantOfflineAccess = function() { return; };
      window.gapi.auth2.GoogleUser.disconnect = function() { return; };
      window.gapi.signin2 = {};
      window.gapi.signin2.render = function() { return; };

      console_log("Google API spoofed")
    }

    /*
     * Taken from https://stackoverflow.com/a/10727155
     */
    function randomString(length) {
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var result = '';
      for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    /*
     * Spoof identity in the DOM
     */
    function insertDOMIdentity() {
      if (!document.body) {
        window.setTimeout(insertDOMIdentity, 100);
        return;
      }


      var div = document.createElement('div');
      // div.style = 'display:none';
      div.innerHTML = '<p>' +
                      'Welcome ' + domName + '!</p>' +
                      '<p>' + domEmail + '</p>';
      document.body.appendChild(div);
    }
    var domSpoof = document.currentScript.getAttribute('data-dom-identity') === 'true';
    if (domSpoof) {
      console_log("Spoofing identifying information in the DOM.");
      var domName = 'Jerome Cisco';
      var domEmail = 'jeromecisco@hotmail.com';
      window.setTimeout(insertDOMIdentity, 100);
    }

    /*
     * Insert chunk into DOM
     */
    function insertChunkIntoDOM() {
      if (!document.body) {
        window.setTimeout(insertChunkIntoDOM, 100);
        return;
      }

      const CHUNKSIZE = 500000;
      var div = document.createElement('div');
      div.innerHTML = "<p id='injected-for-research-purposes-contact-at-webtap.princeton.edu'>" + randomString(CHUNKSIZE) + "</p>";
      document.body.appendChild(div);
    }

    var domChunk = document.currentScript.getAttribute('data-dom-chunk') === 'true';
    if (domChunk) {
	    if(!inIframe()){
	        console_log("Inserting big chunk into DOM");
	        window.setTimeout(insertChunkIntoDOM, 100);
	    }
    }

    /*
     * Spoof login form in the DOM
     */
    function insertDOMLogin() {
      if (!document.body) {
        window.setTimeout(insertDOMLogin, 100);
        return;
      }
      var div = document.createElement('div');
      div.style = `
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0.01;`;
      var form = document.createElement('form');
      form.setAttribute('onsubmit','return false;');
      form.id = 'dom-login-credentials';

      // Username
      var label = document.createElement('label');
      label.innerHTML = 'Username ';
      var input = document.createElement('input');
      input.type = 'text';
      input.name = 'username';
      input.autocomplete = 'username';
      input.placeholder = domLoginEmail;
      form.appendChild(label);
      form.appendChild(input);

      // Password
      var label = document.createElement('label');
      label.innerHTML = 'Password ';
      var input = document.createElement('input');
      input.type = 'password';
      input.name = 'password';
      input.autocomplete = 'current-password';
      form.appendChild(label);
      form.appendChild(input);

      // Submit button
      var input = document.createElement('input');
      input.type = 'submit';
      input.name = 'submit';
      input.value = 'Submit';
      form.appendChild(input);

      div.appendChild(form);
      document.body.appendChild(div);
    }
    var domLoginSpoof = document.currentScript.getAttribute('data-dom-login') === 'true';
    if (domLoginSpoof) {
      console_log("Spoofing login form in the DOM.");
      var domLoginEmail = 'example@example.com';
      window.setTimeout(insertDOMLogin, 100);
    }

    /*
     * Spoof checkout payment forms in the DOM
     */
    function insertDOMCheckout() {
      if (!document.body) {
        window.setTimeout(insertDOMCheckout, 100);
        return;
      }
      var div = document.createElement('div');
      div.style = `
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0.01;`;

      // Copied from:
      // https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
      var paymentForm = `
        <form id="dom-checkout-payment" onsubmit="return false;">
        <label for="frmNameA">Name</label>
        <input name="name" id="frmNameA" placeholder="Full name"
               required autocomplete="name">
        <br/>

        <label for="frmEmailA">Email</label>
        <input type="email" name="email" id="frmEmailA"
               placeholder="name@example.com" required autocomplete="email">
        <br/>

        <label for="frmEmailC">Confirm Email</label>
        <input type="email" name="emailC" id="frmEmailC"
               placeholder="name@example.com" required autocomplete="email">
        <br/>

        <label for="frmAddressS">Address</label>
        <input name="ship-address" required id="frmAddressS"
               placeholder="123 Any Street"
               autocomplete="shipping street-address">
        <br/>

        <label for="frmCityS">City</label>
        <input name="ship-city" required id="frmCityS" placeholder="New York"
               autocomplete="shipping locality">
        <br/>

        <label for="frmStateS">State</label>
        <input name="ship-state" required id="frmStateS" placeholder="NY"
               autocomplete="shipping region">
        <br/>

        <label for="frmZipS">Zip</label>
        <input name="ship-zip" required id="frmZipS" placeholder="10011"
               autocomplete="shipping postal-code">
        <br/>

        <label for="frmCountryS">Country</label>
        <input name="ship-country" required id="frmCountryS" placeholder="USA"
               autocomplete="shipping country">
        <br/>

        <label for="frmNameCC">Name on card</label>
        <input name="ccname" id="frmNameCC" required placeholder="Full Name"
               autocomplete="cc-name">
        <br/>

        <label for="frmCCNum">Card Number</label>
        <input name="cardnumber" id="frmCCNum" required autocomplete="cc-number">
        <br/>

        <label for="frmCCCVC">CVC</label>
        <input name="cvc" id="frmCCCVC" required autocomplete="cc-csc">
        <br/>

        <label for="frmCCExp">Expiry</label>
        <input name="cc-exp" id="frmCCExp" required placeholder="MM-YYYY"
               autocomplete="cc-exp">
        <br/>

        <label for="frmPhoneNumA">Phone</label>
        <input type="tel" name="phone" id="frmPhoneNumA"
               placeholder="+1-650-450-1212" required autocomplete="tel">

        <input type="submit" name="submit" value="Submit">
        </form>`
      div.innerHTML = paymentForm;
      document.body.appendChild(div);
    }
    var domCheckoutSpoof = document.currentScript.getAttribute('data-dom-checkout') === 'true';
    if (domCheckoutSpoof) {
      console_log("Spoofing checkout payment info forms in the DOM.");
      window.setTimeout(insertDOMCheckout, 100);
    }

    /*
     * Spoof identity in first-party browser storage
     *
     * We only inject into inject cookies in the main frame.
     */
    function inIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
    function writeCookie(key, value) {
      var expiry = new Date();
      expiry.setDate(expiry.getDate() + 180);
      var str = 'xxx-' + key + '=' + value + ';expires=' + expiry.toUTCString();
      document.cookie = str;
    }
    var storage_spoof = document.currentScript.getAttribute('data-storage') === 'true';
    if (storage_spoof && !inIframe()) {
      console_log("Spoofing identifying information in storage for", window.self);
      var storageId = {
        'uid': '36732d0b-a127-4903-83a9-482cbcb56aef',
        'email': 'chief_wiggins@hotmail.com',
        'name': 'ChiefWiggins'
      }
      var props = Object.getOwnPropertyNames(storageId);
      for (var i = 0; i < props.length; i++) {
        writeCookie(props[i], storageId[props[i]]);
      }
    }

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
insertScript(getPageScript(), {
  'facebook': self.options.facebook,
  'google': self.options.google,
  'dom-identity': self.options.dom_identity,
  'dom-chunk': self.options.dom_chunk,
  'dom-login': self.options.dom_login,
  'dom-checkout': self.options.dom_checkout,
  'storage': self.options.storage
});
