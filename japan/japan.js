levels.nine=true; 
populate_levels();
if (levels.ten){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Middle man function to check the troll is dead before password works.
function check_local_answer(level_number, answer){
	var one_time_events = get_one_time_events();
	if (one_time_events['troll_killed']){
		check_answer(level_number, answer);
	}
}

// Make troll accept poison apple. And then it dies.
$("#troll").droppable({
	accept: "#inventory-poison-apple",
	drop: function() {
		$(this).attr("src", "../pics/japan/dead-troll.png");
		setTimeout(() => {$(this).addClass('dead');}, 500);
		set_one_time_event('troll_killed');
		$('#knight-speech').attr("src", "../pics/japan/knight-speech2.png");
		remove_from_inventory('poison-apple');
	}
});

// Show knight speech
$("#knight").click(function(){
	$("#knight-speech").show();
})

// Hide knight speech
$(document).click(function(e){
	if($(e.target).closest("#knight").length > 0 ) {
        return false;
    }
	$("#knight-speech").hide();
})


// Enter well
$("#well").click(function(){
	window.location.href = "japan2.html";
})

// Make troll dead if its been killed
var one_time_events = get_one_time_events();
if (one_time_events['troll_killed']){
	$('#troll').addClass('already-dead');
	$('#troll').attr("src", "../pics/japan/dead-troll.png");
	$('#knight-speech').attr("src", "../pics/japan/knight-speech2.png");
}
