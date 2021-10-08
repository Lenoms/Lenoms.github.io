levels.five=true;
console.log('');
populate_levels();

if (levels.six){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Jack disappears as of level eight. Part of game plot
if (levels.eight){
	$('#puzzle6').hide();
}

// Instantiate audio and playing booleans.
var audio_one = new Audio('audio/drake.mp3');
var audio_two = new Audio('audio/peter.mp3');
var audio_three = new Audio('audio/donna.mp3');
var audio_four = new Audio('audio/juliet.mp3');
var audio_five = new Audio('audio/amber.mp3');
var audio_six = new Audio('audio/jack.mp3');
var playing_one, playing_two, playing_three, playing_four, playing_five, playing_six = false;
audio_one.volume = audio_two.volume = audio_three.volume = audio_four.volume = audio_five.volume = audio_six.volume = 0.5;

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
	else if (number == 'five'){playing_five = bool}
	else if (number == 'six'){playing_six = bool};
}

// Get the reference to the playing boolean
function is_playing(number){
	if (number == 'one'){return playing_one}
	else if (number == 'two'){return playing_two}
	else if (number == 'three'){return playing_three}
	else if (number == 'four'){return playing_four}
	else if (number == 'five'){return playing_five}
	else if (number == 'six'){return playing_six};
}

// Get the reference to audio variable
function get_audio(number){
	if (number == 'one'){return audio_one}
	else if (number == 'two'){return audio_two}
	else if (number == 'three'){return audio_three}
	else if (number == 'four'){return audio_four}
	else if (number == 'five'){return audio_five}
	else if (number == 'six'){return audio_six};
}

// Make drake droppable if he's already been named
var one_time_events = get_one_time_events();
if (one_time_events['name_drake'] && !one_time_events['ruby_traded']){
	make_drake_droppable();
}

// If the ruby has been traded, make sure the picture is correct.
if (one_time_events['ruby_traded']){
	$('#person-one').children().attr('src', "../pics/biohackers/person1-2.png")
}

// Handles submit of name guess. Checks that its correct, and then handles it appropriately. 
$(".name-form").submit(function(e) {
    e.preventDefault();
	var input = $(this).children().val();
	var response = get_response($(this).attr('id').slice(5));
	if (input == response[0] || input == response[1]){
		$(this).children().css("outline-color","green");
		$(this).children().css("border-color","green");
		$(this).children().attr('readonly', true);
		alert(response[1] + ": " + response[2]);
		set_one_time_event('name_' + response[0]);
		if (response[0] == 'drake'){
			make_drake_droppable();
		}
	}
});

// If people have been named, they can be clicked to repeat their alert.
$(".person").click(function(){
	var response = get_response($(this).attr('id').slice(7));
	var one_time_events = get_one_time_events();
	if (one_time_events['name_' + response[0]]){
		alert(response[1] + ": " + response[2]);
	}
});

// Make drake (person-one) accept the ruby as a droppable. Retrieves the axe
function make_drake_droppable(){
	$(function() {
		$("#person-one").droppable({
			accept: "#inventory-ruby",
			drop: function(){
				remove_from_inventory("ruby");
				add_to_inventory("axe");
				$(this).children().attr('src', "../pics/biohackers/person1-2.png")
				set_one_time_event('ruby_traded');
				alert("Drake: 'Thank you!'");
			}
		});
	})
}

// Get accepted names and the alert message in an array
function get_response(form_number){
	if (form_number == 'one'){
		var one_time_events = get_one_time_events();
		var alert_text;
		if (!one_time_events['ruby_traded']){
			alert_text = 'You got anything valuable to trade for this axe?';
		}
		else{
			alert_text = 'Thank you!';
		}
		return ['drake', 'Drake', alert_text];
	}
	else if (form_number == 'two'){
		return ['peter', 'Peter', 'AKKLEKBNAE'];
	}
	else if (form_number == 'three'){
		return ['donna', 'Donna', "The answer to this level is 'harbour'. But before you go, the other four might have some valuable information..."];
	}
	else if (form_number == 'four'){
		return ['juliet', 'Juliet', "I've heard you can take out most evil monsters with a poisoned apple!'"];
	}
	else if (form_number == 'five'){
		return ['amber', 'Amber', "I have nothing useful to say!"];
	}
	else if (form_number == 'six'){
		return ['jack', 'Jack', "neerg REVEN tub ,der neht ,eulB"];
	}
	
}

$(document).ready(function() {
	setTimeout(
	  function() 
	  {
		$('.main').show();
	  }, 50);
});