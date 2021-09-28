levels.fourteen=true; 
populate_levels();
if (levels.fifteen){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Initiate some variables
var scientist_dialogue = 'error';
var world_num;
var path = window.location.pathname;
var page = path.split("/").pop();
if (page.slice(11,12) == '.'){
	world_num = 1;
}
else{
	world_num = parseInt(page.slice(11,12));
}

// This function is used by music-player.js to retrieve the world num
function get_world_num(){return world_num};

// Update some things based on world number
if (world_num == 1){check_toolbox()}
else if (world_num == 2){update_scientist_dialogue(); load_music_frame();}

// Time machine navigates to next world on click
$('.time-machine').click(function(){
	var next = world_num + 1;
	if (next > 5){next = '';}
	window.location.href = "titletracks" + next.toString() + ".html";
})

// The grid puzzles are in worlds 3 and 4. Clicking them makes them bigger.
$('.grid').click(function(){
	$(this).toggleClass("grid-big");
});

// The blueprint is in world 5. Same as grids.
$('.blueprint').click(function(){
	$(this).toggleClass("blueprint-big");
});

// Scientist in world 2 gives some useful information
$('.scientist').click(function(){
	alert(scientist_dialogue);
})

// Scientist useful information is updated depending on whether he has his tools (i.e the player has completed the level).
function update_scientist_dialogue(){
	var one_time_events = get_one_time_events();
	if (one_time_events['tools-given']){
		scientist_dialogue = "Scientist: Thank you! Now I can fix what I've created. But I fear the damage may already be done. I think I have unleashed something that is not from this world. You'll need to find it and destroy it, before it destroys us all. The password for the final level is 'finale'. Good luck!";
	}
	else{
		scientist_dialogue = "Scientist: Thank goodness you're here! Something went wrong with my experiment and I appear to have opened some sort of multiverse! I've managed to contain it to this room for now, but we need to shut it down soon. The tools I need are in my tool box back there, but I can't find the key! Can you help me?";
	}
}

// Called on load for world 2 to update the music frame if the discs are the in the right order.
function load_music_frame(){
	var disc_locations = JSON.parse(localStorage.getItem('disc_locations'));
	if ((disc_locations['1'] == '1-player') &&
		(disc_locations['2'] == '2-player') &&
		(disc_locations['3'] == '3-player') &&
		(disc_locations['4'] == '4-player') &&
		(disc_locations['5'] == '5-player')){
			$('.music-frame').attr('src', '../pics/titletracks/music-frame-2.png');
		}
	else{
		$('.music-frame').attr('src', '../pics/titletracks/music-frame-1.png');
	}
}

// Called on load for world 1 to update the tool box to show as open if it has been opened by the shadow key in world 5.
function check_toolbox(){
	var one_time_events = get_one_time_events();
	if (one_time_events['tool-box-unlocked']){
		$('.tool-box').attr('src','../pics/titletracks/open-tool-box.png');
		if (!one_time_events['get_tools']){
			add_scientist_tools();
		}
	}
}

// Called by check_toolbox() to add the scientist tools and pick up functionality.
function add_scientist_tools(){
	var pic_src = '../pics/titletracks/tools.png';
	$('.main').append($('<img>').attr('src', pic_src).attr('id', 'tools'));
	$('#tools').click(function(){
		if (!inventory_full() && check_backpack()){
			add_to_inventory('tools');
			$(this).remove();
			set_one_time_event('get_tools');
		}
	});
}

// Manages the dark-chest form in world 5. 
$(".dark-chest-form").submit(function(e) {
    e.preventDefault();
	var input = $(this).children().val();
	if (input == 'kaerb' || input == 'ʞɒɘɿd'){
		$(this).children().css("outline-color","black");
		$(this).children().css("border-color","black");
		$(this).children().attr('readonly', true);
		//set_one_time_event('dark-chest-opened');
		$(this).siblings('.dark-chest').attr('src', '../pics/titletracks/dark-chest-opened.png');
		$('#shadow-key').show();
		$('.secret-spot').show();
		$('#shadow-key').draggable({containment: 'body'});
	}
});

// Secret spot is the place the key must be dragged in world 5 to unlock the tool box in world 1.
$(".secret-spot").droppable({
	accept: "#shadow-key",
	drop: function(event, ui){
		set_one_time_event('tool-box-unlocked');
	}
});

// The scientist accepts the tools and updates his dialogue.
$(".scientist").droppable({
	accept: "#inventory-tools",
	drop: function(event, ui){
		remove_from_inventory('tools');
		set_one_time_event('tools-given');
		scientist_dialogue = "Scientist: Thank you! Now I can fix what I've created. But I fear the damage may already be done. I think I have unleashed something that is not from this world. You'll need to find it and destroy it, before it destroys us all. The password for the final level is 'finale'. Good luck!";
		alert(scientist_dialogue);
	}
});

// Middle man function so you can't guess finale
function check_local_answer(level_num, answer){
	var one_time_events = get_one_time_events();
	if (one_time_events['tools-given']){
		check_answer(level_num, answer);
	}
}


