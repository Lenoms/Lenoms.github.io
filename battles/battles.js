levels.thirteen=true; 
populate_levels();
if (levels.fourteen){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}


// Instantiate audio and playing booleans.
var audio_one = new Audio('audio/backinblack.mp3');
var audio_two = new Audio('audio/supertrouper.mp3');
var audio_three = new Audio('audio/dropsofjupiter.mp3');
var audio_four = new Audio('audio/babel.mp3');
var playing_one, playing_two, playing_three, playing_four = false;
audio_one.volume = audio_two.volume = audio_three.volume = audio_four.volume = 0.5;

var right_answers_counter = 0;
var connection_buttons_references = [$('#button-one'),$('#button-two'),$('#button-three'),$('#button-four')]

// Track inputs for correct answers
$(".puzzle-answer").keyup(function(e){
	let puzzle_answers = get_puzzle_answers($(this).attr('id').slice(14));
	for (let i = 0; i < puzzle_answers.length; i++){
		if ($(this).val() == puzzle_answers[i]){
			show_next_connection_button();
			$(this).css('color','green');
			$(this).attr('readOnly',true);
			$(this).off('keyup'); 
		}
	}
});

// Retrieve allowable answers. 
function get_puzzle_answers(puzzle_number){
	if (puzzle_number == '1'){return ['why selenium?','Why selenium?']}
	else if (puzzle_number == '2'){return ['ROTLA']}
	else if (puzzle_number == '3'){return ['discovering something that doesnt exist',
										   "discovering something that doesn't exist",
										   'Discovering something that doesnt exist',
											"Discovering something that doesn't exist"]}
	else if (puzzle_number == '4'){return ['del toro', 'Del Toro', 'del Toro', 'Del toro', 'Gómez', 'gómez', 'Gomez', 'gomez']}
}

function show_next_connection_button(){
	connection_buttons_references[right_answers_counter].show();
	right_answers_counter ++;
}


// Music button functionality on click
$('.music-button').click(function(){
	var button_number = $(this).attr('id').slice(7);
	if (is_playing(button_number)){
		get_audio(button_number).pause();
		set_playing(button_number, false);
	}
	else{
		get_audio(button_number).play();
		set_playing(button_number, true);
	}
	$(this).children().toggleClass("playing");
});

// Set the playing boolean
function set_playing(number, bool){
	if (number == 'one'){playing_one = bool}
	else if (number == 'two'){playing_two = bool}
	else if (number == 'three'){playing_three = bool}
	else if (number == 'four'){playing_four = bool}
}

// Get the reference to the playing boolean
function is_playing(number){
	if (number == 'one'){return playing_one}
	else if (number == 'two'){return playing_two}
	else if (number == 'three'){return playing_three}
	else if (number == 'four'){return playing_four}
}

// Get the reference to audio variable
function get_audio(number){
	if (number == 'one'){return audio_one}
	else if (number == 'two'){return audio_two}
	else if (number == 'three'){return audio_three}
	else if (number == 'four'){return audio_four}
}

function check_local_answer(level_num, answer){
	var allowable_answers = "^(titletracks|title tracks|titlesongs|title songs|albumnametracks|album name tracks|albumnamesongs|album name songs|songs with same name as album|songswithsamenameasalbum|tracks with same name as album|trackswithsamenameasalbum)$";
    var found = answer.match(allowable_answers);
	if (found){
		check_answer(level_num, 'titletracks')
	}

	// let allowable_answers = ['titletracks'];
	// for (let i=0; i<allowable_answers.length; i++){
		// if (answer == allowable_answers[i]){
			// check_answer(level_num, 'titletracks')
		// }
	// }
}