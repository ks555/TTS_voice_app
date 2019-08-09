$(document).ready(function(){
  $("#btn_play").click(function(){

	// Set up some variables
	var cereurl = "https://cerevoice.com/soap/soap_1_1.php?";
	var ceremethod = "speakSimple";
	var accID = "5aec2e36c429d";
	var pword = "VkZmL42e5L";
	var cerevoice =  $('#voice').val();
	var txt = $('#input_text').val();
	var audioPlayer = document.getElementById("audio-player");
	var errorMsg = document.getElementById("msg_error");
	
	if (cerevoice == 'None'){
		
		errorMsg.innerHTML = "Please choose a voice and push play";
	}
	else{

		errorMsg.innerHTML = "";
		$.soap({
		url: cereurl,
		method: ceremethod,
		data: {
		accountID: accID,
		password : pword,
		voice
		: cerevoice,
		text
		: txt
		},
		success: function (soapResponse) {
		// do stuff with soapResponse
		// if you want to have the response as JSON use soapResponse.toJSON();
		// or soapResponse.toString() to get XML string
		// or soapResponse.toXML() to get XML DOM
		console.log(soapResponse.toString());
		var xmlDoc = soapResponse.toXML();
		if ($(xmlDoc).find("resultCode").innerHTML == "0") {
			console.log(xmlDoc.getElementsByTagName("resultDescription")[0].textContent);
			return false;
		} else {
			console.log(xmlDoc.getElementsByTagName("resultDescription")[0].textContent);
			console.log(xmlDoc.getElementsByTagName("fileUrl")[0].textContent);
			// $("#output").attr("href", xmlDoc.getElementsByTagName("fileUrl")[0].textContent);
			// $("#output").text("Click to listen");
			audioPlayer.setAttribute('src',  xmlDoc.getElementsByTagName("fileUrl")[0].textContent);
			audioPlayer.play();
		}
		},
		error: function (SOAPResponse) {
			// show error
			console.log(SOAPResponse.toString());
		}
		});
	}

  });

  $("#btn_stop").click(function(){
		var audioPlayer = document.getElementById("audio-player");
		audioPlayer.pause();

  });
	
});



