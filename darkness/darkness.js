levels.eleven=true; 
populate_levels();
if (levels.twelve){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

hide_bubbles();

// Handles showing speech bubbles
$('.person').click(function(){
	hide_bubbles();
	show_speech_bubble($(this).attr('id'));
});

// Hide all bubbles if player clicks anywhere else
$(document).click(function(e){
	if($(e.target).closest(".person").length > 0 ) {
        return false;
    }
	hide_bubbles();
})

// Shows persons speech bubble
function show_speech_bubble(person_name){
	var id = '#' + person_name + '-speech';
	$(id).show();
}

// Hides all speech bubbles
function hide_bubbles(){
	$('.speech-bubble').hide();
}

// Handles functionality of clicking paper ball to show the sequence of numbers (used in Japan well level).
var ball = true;
$('.paper-ball').click(function(){
	if (ball){
		$(this).attr('src','../pics/darkness/note.png');
		ball = false;
	}
	else {
		$(this).attr('src','../pics/darkness/paper-ball.png');
		ball = true;
	}
	$(this).toggleClass("note-big");
})

// Fire place accepts logs to make into torches
$(function() { 
	$("#campfire").droppable({
			accept: "#inventory-log",
			drop: function(){;
				remove_from_inventory('log');
				add_to_inventory('torch');
				set_one_time_event('have_torch');
			}
	});
});