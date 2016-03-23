"use strict";

const { Cc, Ci } = require("chrome");
const tabs = require("sdk/tabs");
var passwordManager = Cc["@mozilla.org/login-manager;1"].getService(
    Ci.nsILoginManager
);

exports.run = function(crawlID) {

  let fakePwd = "PWD12345678";
  let fakeEmail = "randomtestuser@gmail.com";
  let emailField = "email";
  let PwdField = "password";
  let realm = null;
  let formAction = ""

  tabs.on('ready', function(tab) {
    let tabUrlObj = {};
    let host = "";
    if (!tab.url || !tab.url.startsWith("http")){
      console.log("No tab url", tab.url, tab);
      return;
    }
    console.log('tab is loaded', tab.title, tab.url);
    tabUrlObj = require("sdk/url").URL(tab.url);
    if (!tabUrlObj){
      console.log("No tabUrlObj", tabUrlObj, tab.url);
      return;
    }
    let hostname = tabUrlObj.protocol + "//" + tabUrlObj.host;
    let newSignon = Cc["@mozilla.org/login-manager/loginInfo;1"].
      createInstance(Ci.nsILoginInfo);

    newSignon.init(hostname, formAction, realm, fakeEmail, fakePwd, emailField, PwdField);
    console.log("newSignon", hostname, formAction, realm, fakeEmail, fakePwd, emailField, PwdField);
    try {
      // Add the credentials to password database
      passwordManager.addLogin(newSignon);
    } catch (e) {
      console.log("ERROR: passwordManager.addLogin(loginInfo);", e);
    };
  });
};
