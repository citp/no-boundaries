
function append_form(element) {
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
  element.appendChild(form);
}

function insert_forms() {
  // Test 1-8: Insert forms into divs with several visibility properties
  var divs = ['div1', 'div2', 'div3', 'div4', 'div5-2', 'div6-2', 'div7-2', 'div8-2'];
  for (var i=0; i < divs.length; i++) {
    var div = document.getElementById(divs[i]);
    append_form(div);
  }

  // Test 9: Insert form along with multiple nested divs, one set to hidden
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  div1.appendChild(div2);
  var div3 = document.createElement('div');
  div2.appendChild(div3);
  div2.hidden = true;
  append_form(div3);
  var div = document.getElementById('div9');
  div.appendChild(div1);
}

insert_forms();