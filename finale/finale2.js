// So this will involve a graph, with nodes keeping track of adjacencies. On player turn, click to move to a node. If it a valid move, just move player div to left and

var player_node = '9';
var enemy_node = '1';
var enemy_in_range = false;
var enemy_alive = true;
var valid_moves = [];

var node_adjacencies = [['1','2'],['1','5'],['2','3'],['2','6'],['3','4'],['3','7'],['4','8'],['4','17'],['5','6'],['5','9'],['6','7'],['6','10'],['7','8'],['7','11'],['8','12'],['8','17'],['9','10'],['9','13'],['10','11'],['10','14'],['11','12'],['11','15'],['12','17'],['12','16'],['13','14'],['14','15'],['15','16'],['16','17']];

// Initial moves to their node
move_player($('#node-' + player_node));
move_enemy($('#node-' + enemy_node));

// Draw lines
draw_lines();

// This function tracks window resizes and redraws the lines and moves the characters
$(window).resize(function(){draw_lines(); move_player($('#node-' + player_node)); move_enemy($('#node-' + enemy_node))}); 

update_valid_moves();

// Immediately end game if it's already been won
var one_time_events = get_one_time_events();
if (one_time_events['victory']){
	$('#enemy').remove();
	enemy_alive = false;
	show_victory();
}

// Enemy accepts any item, and if its a sword, then it dies. Otherwise it removes the item and takes a turn.
$("#enemy").droppable({
	accept: $('.inventory-item').children('img'),
	drop: function(event, ui){
		if (enemy_in_range){
			var item = ui.draggable.attr("id").slice(10);
			if (item == "sword"){
				game_over();
			} else{
				alert("Your " + item + " broke! You need something more powerful!");
				remove_from_inventory(item);
				process_enemy_turn();
			}
		}					
	}
});

// Handle end of game
function game_over(){
	$('#enemy').addClass('death');
	setTimeout(function(){$('#enemy').remove(); show_victory();},5000);
	enemy_alive = false;
	set_one_time_event('victory');
}

// Displays victory banner
function show_victory(){
	$('.main').append($('<img>').attr('src', "../pics/finale/victory.png").attr('id','victory'));
}

// Handles all game logic. Player clicks node to move, and various functions are called in this.
$('.node').click(function(){
	var node_id = $(this).attr('id').slice(5);
	if (check_valid_move(node_id)){
		move_player($(this));
		player_node = node_id;
		update_valid_moves();
		// Disable click til enemy has moved. Otherwise it was possible to take two turns in a row.
		$(".node").css("pointer-events", "none");
		if (enemy_alive){
			// We have a timer on the enemy turn so that he moves after the player - not concurrently. I just think it looks better.
			setTimeout(function(){process_enemy_turn()},500);
		}
		// Reenable click
		setTimeout(function(){$(".node").css("pointer-events", "auto");},500);
	}
});

// Keeps track of player valid moves. These nodes are highlighted, and are used by check_valid_move()
function update_valid_moves(){
	valid_moves.forEach(function (move, index) {
		$('#node-' + move).removeClass('glow');
	});
	valid_moves = [];
	node_adjacencies.forEach(function (item, index) {
		if (item[0] == player_node){ 
			valid_moves.push(item[1]);
		}
		else if (item[1] == player_node){
			valid_moves.push(item[0]);
		}
	})
	valid_moves.forEach(function (move, index) {
		$('#node-' + move).addClass('glow');
	});
}

// Checks whether a player move is a valid one
function check_valid_move(node_id){
	var valid_move = false;
	valid_moves.forEach(function (move, index) {
		if (move == node_id){
			valid_move = true;
		}
	})
	return valid_move;
}

// Move the player to desired node
function move_player(node){
	x1 = node.offset().left - 5;
	y1 = node.offset().top - node.height()*2.1;
	$('#player').css('left', x1);
	$('#player').css('top', y1);
}

// Enemy takes his turn. Chooses a node, and then moves. Then alerts and sets in range if the move brings him in range.
function process_enemy_turn(){
	var node = enemy_choose_node();
	move_enemy(node[0]);
	if (node[1]){
		enemy_in_range = true;
		setTimeout(function (){alert("You're in range! Finish him!");},500);
	} else {
		enemy_in_range = false;
	}
	enemy_node = node[0].attr('id').slice(5);
}

// AI to choose enemy move. Looks at all possible moves, then eliminates those that bring them to the player node, or within range of the player node. Return a random available move. If no such move is possible, returns any random valid move. Also returns a boolean of whether or not the move brings them within range.
function enemy_choose_node(){
	var possible_moves = [];
	node_adjacencies.forEach(function (item, index) {
		if (item[0] == enemy_node){
			possible_moves.push(item[1]);
		}
		else if (item[1] == enemy_node){
			possible_moves.push(item[0]);
		}
	})
	var actual_moves = [];
	var good_move = true;
	possible_moves.forEach(function (move, index) {
		good_move = true;
		if (move == player_node){
			good_move = false;
		}
		node_adjacencies.forEach (function (item){
			if (((move == item[0]) && (player_node == item[1])) || ((move == item[1]) && (player_node == item[0]))){
				good_move = false;
			}
		})
		if (good_move){
			actual_moves.push(move);
		}
	})
	if (actual_moves.length != 0){
		return [$('#node-' + actual_moves[Math.floor(Math.random()*actual_moves.length)]), false];
	}
	else {
		return [$('#node-' + possible_moves[Math.floor(Math.random()*possible_moves.length)]), true];
	}
}

// Moves the enemy to desired node
function move_enemy(node){
	x1 = node.offset().left - 25;
	y1 = node.offset().top - node.height()*3.8;
	$('#enemy').css('left', x1);
	$('#enemy').css('top',y1);
}

// Draws the lines between nodes
function draw_lines(){
	var line, node1, node2, x1, x2, y1, y2;
	node_adjacencies.forEach(function (item, index) {
		index++;
		line = $('#line-' + index.toString());
		node1 = $('#node-' + item[0].toString());
		node2 = $('#node-' + item[1].toString());

		x1 = node1.offset().left + (node1.width()/2);
		y1 = node1.offset().top - (node1.width()*1.5);
		x2 = node2.offset().left + (node2.width()/2);
		y2 = node2.offset().top - (node1.width()*1.5);

		line.attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2);
	});		
}

// Middle man function to check answer so that you can't guess victory.
function check_local_answer(level_num, answer){
	var one_time_events = get_one_time_events();
	if (one_time_events['victory']){
		check_answer(level_num, answer);
	}
}
