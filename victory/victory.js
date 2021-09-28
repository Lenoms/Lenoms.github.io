
var audio = new Audio('what a life.mp3');
audio.volume = 0.7;
var is_playing = false;

// Music button functionality on click
$('.music-button').click(function(){
	if (is_playing){
		is_playing = false;
		audio.pause();
	} else{
		is_playing = true;
		audio.play();
	}
	$(this).children().toggleClass("playing");
});