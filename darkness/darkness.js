levels.eleven=true; 
populate_levels();
if (levels.twelve){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

hide_bubbles()

$(document).click(function(e){
	if($(e.target).closest(".person").length > 0 ) {
        return false;
    }
	hide_bubbles();
})

$('.person').click(function(){
	hide_bubbles();
	show_speech_bubble($(this).attr('id'));
});

function show_speech_bubble(person_name){
	var id = '#' + person_name + '-speech';
	console.log($(id));
	$(id).show();
}

function hide_bubbles(){
	$('.speech-bubble').hide();
}

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