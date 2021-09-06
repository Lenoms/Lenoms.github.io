levels.seven=true; 
timer_value = 10;
populate_levels();
tick();
var ticker = setInterval(function(){tick()}, 1000);
if (levels.eight){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
	deactivate_bomb();
	$('.header').show();
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Counter is just used by the alert to show your time
var counter = 0;
setInterval(function(){counter++},10);

// Tick down the bomb clock
function tick(){
	time_string = "00:" + timer_value.toString().padStart(2,'0');
	$("#timer").html(time_string);
	timer_value --;
	if (timer_value == -1){trigger_explosion(); clearInterval(ticker)}
}

// Boom
function trigger_explosion(){
	$(".wire").droppable( "option", "disabled", true );
	$("#key").css("z-index","3");
	$(".tool-box").css("z-index","3");
	$("#screwdriver").css("z-index","3");
	$("#wirecutters").css("z-index","3");
	$("#singularity").css("box-shadow", "0 0 800px 400px #FF0000, 0 0 1200px 800px #FFD242" );
	$("#white-out").css("opacity","1");
	setTimeout(function(){$("#white-out").css("background-color","black")},800);
	setTimeout(function(){window.location.href = '../harbour/harbour.html'},3000);
	
}

// Clears the ticker and shows the header
function bomb_disarmed(){
	clearInterval(ticker);
	$('.header').show();
	var high_score = localStorage.getItem('high_score');
	if (high_score > counter/100){
		high_score = counter/100;
		localStorage.setItem('high_score',high_score);
	}
	alert("Congratulations! \nBomb disarmed in " + counter/100 + " seconds! Password is 'boulder'\n\n HIGHSCORE: " + high_score + 's');
}

// To be called if the bomb has already been disarmed. Could extend to show visual elements (wires cut).
function deactivate_bomb(){
	clearInterval(ticker);
}

// Key is draggable
$(function() {
   $("#key").draggable({
	   containment: 'body'
   });
});

// Tool box one accepts the key and yields the screwdriver
var opened_box_one = false;
$(function() {
   $("#tool-box1").droppable({
	   accept: "#key",
	   drop: function(){
		   if (!opened_box_one){
			   $(this).children().attr("src","../pics/poseidon/open-tool-box.png");
			   $(this).css("top","65%");
			   add_screwdriver();
			   opened_box_one = true;
		   }
	   }
   })
});

// Used by tool box one to add screwdriver
function add_screwdriver(){
	var sd_img = document.createElement('img');
	sd_img.src = "../pics/poseidon/screwdriver.png";
	sd_img.setAttribute("id","screwdriver");
	$(".main").append(sd_img);
	$("#screwdriver").draggable({
	   containment: 'body'
	});
}

// Tool box two has an input, and opens to yield the wirecutters
var opened_box_two = false;
$("#tool-box-input").keyup(function(e){
	if (($(this).val() == '84') && (!opened_box_two)){
		$(this).css("color","green");
		$(this).attr('readOnly',true);
		$(this).siblings().attr("src", "../pics/poseidon/open-tool-box.png");
		add_wirecutters();
		opened_box_two = true;
	}
});

// Add wirecutters
function add_wirecutters(){
	var sd_img = document.createElement('img');
	sd_img.src = "../pics/poseidon/wirecutters.png";
	sd_img.setAttribute("id","wirecutters");
	$(".main").append(sd_img);
	$("#wirecutters").draggable({
	   containment: 'body'
	});
}

// Panel on bomb accepts screwdriver and opens to show wires
$(function() {
   $("#panel").droppable({
	   accept: "#screwdriver",
	   drop: function(){
		   $(this).attr("src","../pics/poseidon/open-panel.png");
		   $('.wire').show();
	   }
   })
});

// Logic for dropping the wirecutters on the wires
wire2_cut = false;
wire3_cut = false
$(function() {
   $(".wire").droppable({
	   accept: "#wirecutters",
	   tolerance: 'pointer',
	   drop: function(){
		   $(this).addClass("wire-cut");
		   if($(this).attr("id") == "wire1"){trigger_explosion()};
		   if(($(this).attr("id") == "wire2") && (!wire3_cut)){trigger_explosion()};
		   if(($(this).attr("id") == "wire2") && (wire3_cut)){bomb_disarmed()};
		   if($(this).attr("id") == "wire3"){wire3_cut = true;};
		   
	   }
   })
});