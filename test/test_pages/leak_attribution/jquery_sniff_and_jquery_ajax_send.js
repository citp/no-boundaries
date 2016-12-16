// send the email in the image url
function send_email(email) {
  console.log("Will send the email read from the form", email);
  var url = "../shared/test_image.png?email=" + email;
  $.get(url);
}

// register a blur event handler
$(document).ready(function() {
  $("#input1").blur(function() {
    send_email($("#input1").val());
  })
});
