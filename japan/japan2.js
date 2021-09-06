levels.nine=true; 
populate_levels();
if (levels.ten){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

$("#up-arrow").click(function(){
	window.location.href = "japan.html";
})

var expected_clicks = [4,3,5,1,2];
var index = 0;

// Add sword/hole depending on whats been done
var one_time_events = get_one_time_events();
if ((one_time_events['sword_found'])&&(!one_time_events['sword_acquired'])){add_sword();add_hole();}
if ((one_time_events['sword_found'])&&(one_time_events['sword_acquired'])){add_hole();}

// Tile puzzle implemented
$(".tile-puzzle").click(function(){
	if ($(this).attr('id').charAt(12) == expected_clicks[index]){
		index ++;
		if (index == 5){
			puzzle_success();
			index = 0;
		}
	}
	else{
		index = 0;
	}
})

// Handle puzzle success
function puzzle_success(){
	var one_time_events = get_one_time_events();
	if (!one_time_events['sword_found']){
		add_hole();
		add_sword();
		set_one_time_event('sword_found');
	}
}

// Add sword, and its pick-up function
function add_sword(){
	sword = document.createElement("img");
	sword.setAttribute('id','sword');
	sword.setAttribute('src','../pics/japan/sword.png');
	document.body.appendChild(sword);
	$('#sword').click(function(){
		if (!inventory_full()){
			$(this).remove();
			add_to_inventory('sword');
			set_one_time_event('sword_acquired');
		}
	});
}

// Add hole
function add_hole(){
	hole = document.createElement("div");
	hole.setAttribute('id', 'hole');
	document.body.appendChild(hole);
}