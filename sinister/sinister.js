levels.four=true; 
populate_levels();
if (levels.five){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

if (levels.eleven){
	$('#car').addClass('unhinged');
	$('#bird').css("transform",'rotate(15deg)');
	$('#bird2').css("transform",'rotate(180deg)');
}

// Track the input on each input box
$(".input-box").keyup(function(e){
	if ($(this).val().length == $(this).attr("maxlength")){
		$(this).next().focus();
		var input_number = $(this).attr('id').slice(6);
		if (input_number == 'two' ||
			input_number == 'four' || 
			input_number == 'six' || 
			input_number == 'eight' || 
			input_number == 'nine' ){
				check_puzzle_answer($(this), input_number);
		}
	}
	else if ($(this).val().length == 0 && e.keyCode == 8){
		$(this).prev().focus();
	}
});

// Check the answers and handle success accordingly
function check_puzzle_answer(input_element, puzzle_number){
	var answers = get_answers(puzzle_number);
	if (!(puzzle_number == 'nine')){
		if (((input_element.prev().val() == answers[0]) ||
			(input_element.prev().val() == answers[1])) &&
			((input_element.val() == answers[2]) ||
			(input_element.val() == answers[3])))
			{
				input_element.css('color','green');
				input_element.prev().css('color','green');
				input_element.attr('readOnly',true);
				input_element.prev().attr('readOnly',true);
			}
	}
	else{
		if (((input_element.val() == answers[0]) ||
		(input_element.val() == answers[1])))
		{
			input_element.css('color','green');
			input_element.attr('readOnly',true);
		}
	}
}

// Returns the correct answers for each puzzle
function get_answers(puzzle_number){
	if (puzzle_number == 'two'){return ['taylor','Taylor', 'swift', 'Swift']}
	else if (puzzle_number == 'four'){return ['rubeus','Rubeus','hagrid','Hagrid']}
	else if (puzzle_number == 'six'){return ['resident','Resident', 'evil','Evil']}
	else if (puzzle_number == 'eight'){return ['turkey','Turkey','maine','Maine']}
	else if (puzzle_number == 'nine'){return ['chiquitita','Chiquitita']}
}

// Make the witch accept an apple and return a poison apple
$(function() {  
	$("#witch").droppable({
			accept: "#inventory-apple",
			drop: function(){
				remove_from_inventory("apple");
				add_to_inventory("poison-apple");
			}
	});
})

// Put gem in if it hasn't been picked up
var one_time_events = get_one_time_events();
if (!one_time_events['get_gem']){
	$('#puzzle-pics-two').prepend('<img id="gem" src="../pics/sinister/two-one.png" />')
}

// Make the gem pick-upable
$("#gem").click(function(){
	var one_time_events = get_one_time_events();
	var levels = JSON.parse(localStorage.getItem("levels"));
	if (levels['five']){
		if (!one_time_events['get_gem']){
			if (check_backpack() && !inventory_full()){
				add_to_inventory('ruby');
				set_one_time_event('get_gem');
				var element = document.getElementById("gem");
				element.parentNode.removeChild(element);
			}
		}
	}
});

$(document).ready(function() {;
	setTimeout(
	  function() 
	  {
		$('.main').show();
	  }, 15);
});
