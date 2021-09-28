let levels = JSON.parse(localStorage.getItem("levels"));
console.log("Global script sucessfully loaded");

// Runs on load. Prevents reload on form submit and adds inventory
function main(){
	var form = document.getElementById("myForm");
	function handleForm(event) { event.preventDefault(); } 
	form.addEventListener('submit', handleForm);
	if(check_backpack()){
		add_inventory();
	}
	set_bin_droppable();
}

// Used by each level to check the answer in the header bar.
function check_answer(level_number, answer){
	if (answers[level_number] == answer){
		window.location.href = '../' + answer + '/' + answer + '.html';
	}
	else if (answer == 'AKKLEKBNAE'){
		window.location.href = '../eastereggs/partytime.html';
	}
}

// Used by each level to update the levels object in local storage. This object needs to be up to date, since some events rely on it.
function populate_levels(){	
	localStorage.setItem("levels", JSON.stringify(levels));
}

// Used by the arrows in the header to navigate between levels easily.
function nav(level_number){
	levels = JSON.parse(localStorage.getItem("levels"));
	if (levels[level_number]){
		window.location.href = '../' + map_to_name(level_number) + '/' + map_to_name(level_number) + '.html';
	}
}

// Resets the game and all local storage values
function reset_levels(){
	let levels = {
		'one': true,
		'two': false,
		'three': false,
		'four': false,
		'five': false,
		'six': false,
		'seven': false,
		'eight': false,
		'nine': false,
		'ten': false,
		'eleven': false,
		'twelve': false,
		'thirteen': false,
		'fourteen': false,
		'fifteen': false
	}
	localStorage.setItem("levels", JSON.stringify(levels));
	localStorage.setItem("backpack", false);
	var inventory = {
			'slot1': '',
			'slot2': '',
			'slot3': '',
			'slot4': ''
		}
	localStorage.setItem("inventory", JSON.stringify(inventory));
	var one_time_events = {}
	localStorage.setItem('one_time_events', JSON.stringify(one_time_events));
	var discs = {
	'1': '4-player',
	'2': '2-player',
	'3': '1-player',
	'4': '5-player',
	'5': '3-player'
	}
	localStorage.setItem('disc_locations', JSON.stringify(discs));
	return("Levels reset!");
}

// Adds the inventory to the header bar(without displaying items);
function add_inventory(){
	var div;
	div = document.createElement("img");
	div.setAttribute('id', 'bin');
	div.setAttribute('src','../pics/bin.png');
	document.getElementById("inventory-items").appendChild(div);
	div = document.createElement("div");
	div.classList.add("inventory-item");
	div.setAttribute('id', 'inventory-item-one');
	document.getElementById("inventory-items").appendChild(div);
	div = document.createElement("div");
	div.classList.add("inventory-item");
	div.setAttribute('id', 'inventory-item-two');
	document.getElementById("inventory-items").appendChild(div);
	div = document.createElement("div");
	div.classList.add("inventory-item");
	div.setAttribute('id', 'inventory-item-three');
	document.getElementById("inventory-items").appendChild(div);
	div = document.createElement("div");
	div.classList.add("inventory-item");
	div.setAttribute('id', 'inventory-item-four');
	document.getElementById("inventory-items").appendChild(div);
	document.getElementById("inventory-title-heading").innerHTML = "Inventory";
	display_inventory();
	
}

// Takes an item string and adds it to the inventory
function add_to_inventory(item_string){
	var inventory = JSON.parse(localStorage.getItem("inventory"));
	if (inventory.slot1 == ''){
		inventory.slot1 = item_string;
	}
	else if (inventory.slot2 == ''){
		inventory.slot2 = item_string;
	}
	else if (inventory.slot3 == ''){
		inventory.slot3 = item_string;
	}
	else if (inventory.slot4 == ''){
		inventory.slot4 = item_string;
	}
	else{
		console.log("Inventory full!");
	}
	localStorage.setItem("inventory", JSON.stringify(inventory));
	display_inventory();
	$(function(){
	$('.inventory-item').children('img').draggable({
		revert: true,
	});
	set_bin_droppable();
});
}

// Takes an item string and removes it from the inventory
function remove_from_inventory(item_string){
	var inventory = JSON.parse(localStorage.getItem("inventory"));
	if (inventory.slot1 == item_string){
		inventory.slot1 = '';
	}
	else if (inventory.slot2 == item_string){
		inventory.slot2 = '';
	}
	else if (inventory.slot3 == item_string){
		inventory.slot3 = '';
	}
	else if (inventory.slot4 == item_string){
		inventory.slot4 = '';
	}
	localStorage.setItem("inventory", JSON.stringify(inventory));
	display_inventory();
	$(function(){
		$('.inventory-item').children('img').draggable({
			revert: true,
		});
	});
}

// This is used by the above three functions to update the UI of the inventory. Displays the picture of each item in its slot.
function display_inventory(){
	var inventory = JSON.parse(localStorage.getItem("inventory"));
	var img;
	if (!inventory.slot1 == ''){
		if (!$('#inventory-item-one').has('img').length){
			img = document.createElement("img");
			img.src = '../pics/' + inventory.slot1 + '.png';
			img.setAttribute('id', "inventory-" + inventory.slot1);
			$('#inventory-item-one').append(img);
		}
	}
	else{
		document.getElementById('inventory-item-one').innerHTML = '';
	}
	if (!inventory.slot2 == ''){
		if (!$('#inventory-item-two').has('img').length){
			img = document.createElement("img");
			img.src = '../pics/' + inventory.slot2 + '.png';
			img.setAttribute('id', "inventory-" + inventory.slot2);
			$('#inventory-item-two').append(img);
		}
	}
	else{
		document.getElementById('inventory-item-two').innerHTML = '';
	}
	if (!inventory.slot3 == ''){
		if (!$('#inventory-item-three').has('img').length){
			img = document.createElement("img");
			img.src = '../pics/' + inventory.slot3 + '.png';
			img.setAttribute('id', "inventory-" + inventory.slot3);
			$('#inventory-item-three').append(img)
		}
	}
	else{
		document.getElementById('inventory-item-three').innerHTML = '';
	}
	if (!inventory.slot4 == ''){
		if (!$('#inventory-item-four').has('img').length){
			img = document.createElement("img");
			img.src = '../pics/' + inventory.slot4 + '.png';
			img.setAttribute('id', "inventory-" + inventory.slot4);
			$('#inventory-item-four').append(img)
		}
	}
	else{
		document.getElementById('inventory-item-four').innerHTML = '';
	}
}

// Sets inventory items to be draggable. Runs on load.
$(function(){
	$('.inventory-item').children('img').draggable({
		containment: 'body',
		revert: true
	});
});

// Makes the bin droppable. Accepts any inventory item and removes it.
function set_bin_droppable(){
	$(function() { 
		$("#bin").droppable({
				accept: $('.inventory-item').children('img'),
				drop: function(e, ui){
					var item_string = (ui.draggable.attr('id').slice(10))
					remove_from_inventory(item_string);
				}
		});
	});
}

// Used by other scripts to check if the player has the backpack before adding an item to the inventory.
function check_backpack(){
	return (JSON.parse(localStorage.getItem("backpack")))
}

// Checks if the inventory is full.
function inventory_full(){
	var inventory = JSON.parse(localStorage.getItem("inventory"));
	if (!inventory.slot1 == '' && 
		!inventory.slot2 == '' && 
		!inventory.slot3 == '' && 
		!inventory.slot4 == ''){
		return true;
	}
	else{
		return false;
	}
}

// Used by other levels to return the one time events from local storage.
function get_one_time_events(){
	return JSON.parse(localStorage.getItem('one_time_events'));
}

// Used by other scripts to set a one time event in local storage. This is usually to manage state information between levels.
function set_one_time_event(string){
	var one_time_events = JSON.parse(localStorage.getItem('one_time_events'));
	one_time_events[string] = true;
	localStorage.setItem('one_time_events', JSON.stringify(one_time_events));
}

// Resets highscore of bomb level
function reset_highscore(){
	localStorage.setItem('high_score',10);
}

// This is used by the nav function to create the URL name
function map_to_name(level_number){
	let map = {
		'one': 'helloworld',
		'two': 'butterflies',
		'three': 'silvanus',
		'four': 'sinister',
		'five': 'biohackers',
		'six': 'harbour',
		'seven': 'poseidon',
		'eight': 'boulder',
		'nine': 'japan',
		'ten': 'cave',
		'eleven': 'darkness',
		'twelve': 'snowy',
		'thirteen': 'battles',
		'fourteen': 'titletracks',
		'fifteen': 'finale',
		'sixteen': 'victory'
	}
	return map[level_number];
}

// Holds the answers to levels.
let answers = {
	'one': 'butterflies',
	'two': 'silvanus',
	'three': 'sinister',
	'four': 'biohackers',
	'five': 'harbour',
	'six': 'poseidon',
	'seven': 'boulder',
	'eight': 'japan',
	'nine': 'cave',
	'ten': 'darkness',
	'eleven': 'snowy',
	'twelve': 'battles',
	'thirteen': 'titletracks',
	'fourteen': 'finale',
	'fifteen': 'victory'
}

main();