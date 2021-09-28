levels.ten=true; 
populate_levels();
if (levels.eleven){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Adds the riddle text only if player has torch. So that player can't check source code and read riddle prematurely there.
var one_time_events = get_one_time_events();
if (one_time_events['have_torch']){
	document.getElementById("text1").innerHTML = "It cannot be seen";
	document.getElementById("text2").innerHTML = "cannot be felt";
	document.getElementById("text3").innerHTML = "cannot be heard";
	document.getElementById("text4").innerHTML = "cannot be smelt";
	document.getElementById("text5").innerHTML = "It lies behind stars";
	document.getElementById("text6").innerHTML = "It lies under hills";
	document.getElementById("text7").innerHTML = "And empty holes it fills";
	document.getElementById("text8").innerHTML = "It comes first";
	document.getElementById("text9").innerHTML = "It follows after";
	document.getElementById("text10").innerHTML = "Ends life";
	document.getElementById("text11").innerHTML = "kills laughter";
}

// Middle man check answer so that the torch is required to progress (people might guess 'darkness')
function check_local_answer(level_number, answer){
	if (one_time_events['have_torch']){
		check_answer(level_number, answer);
	}
}