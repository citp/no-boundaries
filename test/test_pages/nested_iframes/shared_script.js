// Make js call
console.log(window.navigator.userAgent);

// Add new element
var form = document.createElement("form");
form.id = "modify-me";
var div = document.getElementById("container");
div.appendChild(form);

// Modify element
div = document.getElementById("modify-me");
div.setAttribute("testing","testing");
