
exports.run = function(crawlID) {

  var newSignon = Cc["@mozilla.org/login-manager/loginInfo;1"].createInstance(Ci.nsILoginInfo);
    newSignon.init(aNewSignon.hostname, aNewSignon.formSubmitURL,
        aNewSignon.httpRealm, aNewSignon.username,
        aNewSignon.password, aNewSignon.usernameField,
        aNewSignon.passwordField);
    
    try {
        pwdSvc.modifyLogin(SavedPasswordEditor.oldSignon, newSignon);
        showAlert(genStrBundle.GetStringFromName("logininfochanged"));
    } catch (e) {
      promptSvc.alert(
          aParentWindow,
          genStrBundle.GetStringFromName("error"),
          genStrBundle.formatStringFromName("failed", [e.message], 1));
    }

};
