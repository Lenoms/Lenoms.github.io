levels.fifteen=true; 
populate_levels();

var focused_element = $('#1');
var target_answer;
var most_recent_focus_correct = false;

var people = {
	"Scientist": false,"Donna": false,"Jack": false,"Troll": false,"Peter": false,"Drake": false,"Amber": false,"Juliet": false,
	"Charlotte": false,"Duncan": false,"Mike": false,"Dora": false,"Witch": false,"Dylan": false,"Knight": false,"Silvanus": false
}

// Handles grid box click functionality. Focuses on input box.
$(".grid-box").click(function() {
    target_answer = get_answer_by_id($(this).attr('id'));
	if (!people[target_answer]){
		focus_element($(this));
		$("#input-answers").focus();
	}
});

// Colours the grid box the correct colour. Pale green if answer was correct, grey if not, otherwise red
function focus_element(element_to_focus){
	if (most_recent_focus_correct){
		focused_element.css('background-color','#99ff99');
	}
	else{
		focused_element.css('background-color','#e6e6e6');
	}
	most_recent_focus_correct = false;
	element_to_focus.css('background-color','#FF8181');
	focused_element = element_to_focus;
}

// Gets answers by tile id
function get_answer_by_id(id){
	if (id == '1'){return 'Scientist'};
	if (id == '2'){return 'Donna'};
	if (id == '3'){return 'Jack'};
	if (id == '4'){return 'Troll'};
	if (id == '5'){return 'Peter'};
	if (id == '6'){return 'Drake'};
	if (id == '7'){return 'Amber'};
	if (id == '8'){return 'Juliet'};
	if (id == '9'){return 'Charlotte'};
	if (id == '10'){return 'Duncan'};
	if (id == '11'){return 'Mike'};
	if (id == '12'){return 'Dora'};
	if (id == '13'){return 'Witch'};
	if (id == '14'){return 'Dylan'};
	if (id == '15'){return 'Knight'};
	if (id == '16'){return 'Silvanus'};
}

// Handles input. Checks answer and handles it accordingly
$("#input-answers").keyup(function(e){
	if (($(this).val() == target_answer) && (!people[target_answer])){
		focused_element.css('background-color','green');
		people[target_answer] = true;
		most_recent_focus_correct = true;
		if (target_answer == 'Jack'){
			var one_time_events = get_one_time_events();
			if (!one_time_events['victory']){
				focused_element.append($('<img>').attr('src', "../pics/finale/" + target_answer + ".png").attr('id', target_answer));
				trigger_endgame()
			}
		} else {
			focused_element.append($('<img>').attr('src', "../pics/finale/" + target_answer + ".png").attr('id', target_answer));
			focused_element.append($('<p></p>').text(target_answer));
		}
		$(this).val('');
	}
});

// Triggers animation and redirect window
function trigger_endgame(){
	$('#Jack').remove();
	$('.main').append($('<img>').attr('src', "../pics/finale/jack.png").addClass('jack'));
	setTimeout(function(){$('.main').addClass('inside-glow')}, 3500);
	setTimeout(function(){window.location.href = "finale2.html" }, 5300);
}

// Middle man function so you can't guess victory
function check_local_answer(level_num, answer){
	var one_time_events = get_one_time_events();
	if (one_time_events['victory']){
		check_answer(level_num, answer);
	}
}