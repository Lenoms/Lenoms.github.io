/*  This script handles just the music player functionality from the titletracks level. I seperated it from the other script since theres quite a lot and it's best to avoid confusion. */

var world_num = get_world_num();
load_world_state(world_num)

// Loads the discs into the world based on the disc locations object in local storage
function load_world_state(world_num){
	var disc_locations = JSON.parse(localStorage.getItem('disc_locations'));
	for (const key in disc_locations) {
		if (parseInt(disc_locations[key][0]) == world_num){
			if (disc_locations[key].slice(2,8) == 'player'){
				$('.record-player').attr('src','../pics/titletracks/record-player-' + key + '.png');
			}
			else if (disc_locations[key].slice(2,8) == 'ground'){
				add_disc_to_ground(key)
			}
		}
	}
}

// Instantiate audio and playing booleans.
var audio_one = new Audio('audio/Summer of 69 -1.mp3');
var audio_two = new Audio('audio/Summer of 69 -2.mp3');
var audio_three = new Audio('audio/Summer of 69 -3.mp3');
var audio_four = new Audio('audio/Summer of 69 -4.mp3');
var audio_five = new Audio('audio/Summer of 69 -5.mp3');
var playing_one, playing_two, playing_three, playing_four, playing_five = false;
audio_one.volume = audio_two.volume = audio_three.volume = audio_four.volume = audio_five.volume = 0.5;

// Music button functionality on click
$('.music-button').click(function(){
	var current_record = $(this).siblings('.record-player').attr('src').slice(34,35);
	if (current_record != 'l'){
		if (is_playing(current_record)){
			get_audio(current_record).pause();
			set_playing(current_record, false);
		}
		else{
			get_audio(current_record).play();
			set_playing(current_record, true);
		}
		$(this).children().toggleClass("playing");
	}
});

// Drag and drop record on record-player to put it on
$(".record-player").droppable({
			accept: "#inventory-record-1, #inventory-record-2, #inventory-record-3, #inventory-record-4, #inventory-record-5, .record",
			drop: function(event, ui){
				if ($(this).attr('src') == '../pics/titletracks/empty-record-player.png' ||
					$(this).attr('src') == '../pics/titletracks/empty-record-player-mirror.png'){
						var draggableId;
						console.log(ui.draggable.attr('id'))
						if (ui.draggable.attr("id").length == 8){
							draggableId = ui.draggable.attr("id").slice(7);
							$('#record-' + draggableId).remove();
							
						} else{
							draggableId = ui.draggable.attr("id").slice(17);
							remove_from_inventory('record-' + draggableId);
						}
					add_disc_to_player($(this),draggableId);
					load_music_frame();
				}
			}
});

// Click record player to get disc
$('.record-player').click(function(){
	var record_id = $(this).attr('src').slice(34,35);
	if (record_id != 'l'){
		remove_disc_from_player($(this));
		add_disc_to_ground(record_id);
		get_audio(record_id).pause();
		set_playing(record_id, false);
		load_music_frame();
	}
})

// Add disc to level, on the ground
function add_disc_to_ground(record_id){
	var pic_src = '../pics/titletracks/record-' + record_id + '.PNG';
	$('.record-player-and-button').append($('<img>').attr('src', pic_src).attr('id', 'record-' + record_id).addClass("record"));
	set_to_ground(record_id)
	$(".record" ).draggable({containment: '.main', revert: true});
	$('#record-' + record_id).click(function(){
		if (!inventory_full() && check_backpack()){
			add_to_inventory($(this).attr('id'));
			$(this).remove();
			var disc_locations = JSON.parse(localStorage.getItem('disc_locations'));
			disc_locations[record_id] = world_num + '-inventory';
			localStorage.setItem('disc_locations', JSON.stringify(disc_locations));
		}
	});
}

// Sets the local storage value of the record to ground
function set_to_ground(record_id){
	var disc_locations = JSON.parse(localStorage.getItem('disc_locations'));
	disc_locations[record_id] = world_num + '-ground';
	localStorage.setItem('disc_locations', JSON.stringify(disc_locations));
}

// Adds the disc to the record-player
function add_disc_to_player(record_player, record_id){
	record_player.attr('src', '../pics/titletracks/record-player-' + record_id + '.png');
	$('.button').removeClass("playing");
	var disc_locations = JSON.parse(localStorage.getItem('disc_locations'));
	disc_locations[record_id] = world_num + '-player';
	localStorage.setItem('disc_locations', JSON.stringify(disc_locations));
}

// Removes the disc from the record player
function remove_disc_from_player(record_player){
	record_player.attr('src','../pics/titletracks/empty-record-player.png');
	$('.button').removeClass("playing");
}

// Set the playing boolean
function set_playing(number, bool){
	if (number == '1'){playing_one = bool}
	else if (number == '2'){playing_two = bool}
	else if (number == '3'){playing_three = bool}
	else if (number == '4'){playing_four = bool}
	else if (number == '5'){playing_five = bool};
}

// Get the reference to the playing boolean
function is_playing(number){
	if (number == '1'){return playing_one}
	else if (number == '2'){return playing_two}
	else if (number == '3'){return playing_three}
	else if (number == '4'){return playing_four}
	else if (number == '5'){return playing_five};
}

// Get the reference to audio variable
function get_audio(number){
	if (number == '1'){return audio_one}
	else if (number == '2'){return audio_two}
	else if (number == '3'){return audio_three}
	else if (number == '4'){return audio_four}
	else if (number == '5'){return audio_five};
}