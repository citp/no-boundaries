"use strict";

const { Cc, Ci }    = require("chrome");
const tabs          = require("sdk/tabs");
const tabUtils      = require("sdk/tabs/utils");
const { viewFor }   = require("sdk/view/core");
const URL           = require("sdk/url").URL
var passwordManager = Cc["@mozilla.org/login-manager;1"].getService(
    Ci.nsILoginManager
);

let EMAIL_FIELD = "email";
let PWD_FIELD = "password";
let REALM = null;
let FORM_ACTION = ""

let addCredentialsForURL = function(url, fakeEmail, fakePwd) {
  if (!url || !url.startsWith("http")){
    console.log("Missing or non-http tab url:", url);
    return;
  }

  // Parse url
  let urlObj = URL(url);
  if (!urlObj) {
    console.log("Unable to parse url", urlObj, url);
    return;
  }
  let hostname = urlObj.protocol + "//" + urlObj.host;
  if (urlObj.port) {
    hostname += ':' + urlObj.port;
  }

  // Add credentials for this url, if they don't already exist
  let newSignon = Cc["@mozilla.org/login-manager/loginInfo;1"].
    createInstance(Ci.nsILoginInfo);
  newSignon.init(hostname, FORM_ACTION, REALM, fakeEmail, fakePwd, EMAIL_FIELD, PWD_FIELD);
  try {
    if (passwordManager.findLogins({}, hostname, FORM_ACTION, REALM).length == 0) {
      passwordManager.addLogin(newSignon);
      console.log("Login credentials successfully added: ", hostname,
          FORM_ACTION, REALM, fakeEmail, fakePwd, EMAIL_FIELD, PWD_FIELD);
    }
  } catch (e) {
    console.log("ERROR: passwordManager.addLogin(loginInfo);", e);
  };
}

exports.run = function(crawlID, fakeEmail, fakePwd) {
  tabs.on('ready', function(tab) {
    console.log('tab is ready', tab.title, tab.url);
    addCredentialsForURL(tab.url, fakeEmail, fakePwd);
    let XULtab = viewFor(tab);
    let browser = tabUtils.getBrowserForTab(XULtab);
    if (!browser.hasAttribute('openwpm-autofill-faked')) {
      browser.addEventListener("load", function(evnt) {
        addCredentialsForURL(evnt.target.URL, fakeEmail, fakePwd);
      }, true);
      // Ensure we don't register multiple event listeners for this browser
      browser.setAttribute('openwpm-autofill-faked', true);
    }
  });
};
