if (levels.nine){
	$('.main').append($('<img>').attr('src', "../pics/butterflies/silvanus.png").attr('id', 'silvanus'));
}
// Click on the door to exit the cabin
$('#door').click(function(){
	window.location.href = 'butterflies.html';
});

// Click on the map to make it bigger
$('#map').click(function(){
	$('#map').toggleClass("map-big");
});

// Add backpack if its not there
if (!check_backpack()){
	var img = document.createElement("img");
	img.src = "../pics/butterflies/backpack.png";
	var src = document.getElementById("backpack");
	src.appendChild(img);
};

// Get backpack
$("#backpack").click(function() {
	$(this).remove();
	localStorage.setItem("backpack", true);
	add_inventory();
});

// Silvanus interaction
$("#silvanus").click(function() {
	alert("Silvanus: I'm glad my house is okay! Have you managed to catch whomever planted that bomb?");
});

// Fire place accepts logs to make into torches
$(function() { 
	$("#fireplace").droppable({
			accept: "#inventory-log",
			drop: function(){;
				remove_from_inventory('log');
				add_to_inventory('torch');
				set_one_time_event('have_torch');
			}
	});
});