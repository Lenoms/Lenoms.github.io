levels.two=true; 
populate_levels();
if (levels.three){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

var one_time_events = get_one_time_events();
// Add the chest if its been found
if (one_time_events['find_chest']){
	add_chest();
}

// Add the apple if the trees been clicked on but the apple hasn't been picked up.
if (one_time_events['apple_tree'] && !one_time_events['apple_picked_up']){
	add_apple();
}

// Click on tree 7 to get the apple
$( "#tree7" ).click(function() {
	var one_time_events = get_one_time_events();
	if (!one_time_events['apple_tree']){
		add_apple();
		set_one_time_event('apple_tree');
	}

});

// Enter the cabin by clicking on it
$('#cabin').click(function(){
	window.location.href = 'butterflies-2.html';
});

// Click on secret location to reveal the chest
$('#wut').click(function(){
	var one_time_events = get_one_time_events();
		if (!one_time_events['find_chest']){
			add_chest();
			set_one_time_event('find_chest');
		}
});

// Adds the chest
function add_chest(){
	var img = document.createElement("img");
	img.src = "../pics/chest-closed.png";
	img.setAttribute("id","chest");
	var src = document.getElementById("wut");
	src.appendChild(img);
	chest_clicked = false;
	$( "#chest" ).click(function() {
		if (!chest_clicked){
			$(this).attr("src", "../pics/chest-open.png");
			var src = document.getElementById("wut");
			img = document.createElement("img");
			img.src = "../pics/butterflies/scroll.PNG";
			img.setAttribute("id","scroll");
			src.appendChild(img);
			chest_clicked = true;
		}
	});
}

// Adds the apple 
function add_apple(){
	var img = document.createElement("img");
	img.src = "../pics/apple.png";
	img.setAttribute("id","apple");
	$('.main').append(img);
	$( "#apple" ).click(function() {
		if (check_backpack() && !inventory_full()){
			add_to_inventory("apple");
			var element = document.getElementById("apple");
			element.parentNode.removeChild(element);
			set_one_time_event('apple_picked_up')
		}
	});

}

// Make trees choppable via the axe.
$(function() { 
	$(".tree").droppable({
			accept: "#inventory-axe",
			drop: function(){
				$(this).attr("src", "../pics/butterflies/stump.png");
				$(this).attr("class", "stump");
				var tree_id = $(this).parent().attr('id');
				var one_time_events = get_one_time_events();
				if ((tree_id == 'tree7') && (!one_time_events['apple_tree'])){
					add_apple();
					set_one_time_event('apple_tree');
				}
				set_one_time_event(tree_id + '_cut');
				if (check_backpack() && !inventory_full()){
					add_to_inventory('log');
				}
				else{
					var img = document.createElement("img");
					img.src = "../pics/log.png";
					img.classList.add('log');
					$(this).parent().append(img);
					$( ".log" ).click(function() {
						if (check_backpack() && !inventory_full()){
							add_to_inventory("log");
							$(this).remove();
						}
					})
				}
			}
	});
});

// Set trees to stumps if they've been cut down
var one_time_events = get_one_time_events();
for (let i = 1; i<12; i++){
	if (one_time_events['tree' + i + '_cut']){
		id = '#tree' + i;
		$(id).children().attr('src', "../pics/butterflies/stump.png");
		$(id).children().attr("class", "stump");
	}	
}

$('.main').show();