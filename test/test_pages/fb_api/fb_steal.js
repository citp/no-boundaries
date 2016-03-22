function checkLoginState() {
    if (!("FB" in window)){
        console.log("Can't find FB object, will try 1sec later")
        setTimeout(checkLoginState, 1000);
        return;
    }
    FB.getLoginStatus(function(response) {
        if (response && !response.error) {
            if (response.status === 'connected') {
                print_fb_name();
            } else {
                console.log("Not connected to FB. Will check again in 2 sec");
                setTimeout(checkLoginState, 2000);
            }
        }
    });
};

function print_fb_name(){
    FB.api('/me',  {fields: "name,email,gender"}, function(response) {
		if (response && !response.error) {
			document.getElementById("info3rdp").innerHTML =
				"Third-party script gets access to FB SDK: <br>" +
				"Name: " + response.name + "<br>" +
				"Email: " + response.email + "<br>" +
				"Gender: " + response.gender + "<br>";
		}else{
			console.log("Cannot fetch your info");
		}
        
    });
}

checkLoginState();
