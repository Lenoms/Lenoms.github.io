levels.six=true; 
populate_levels();
if (levels.seven){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

var fish = false;
var bubbles = false;
var seaweed = false;
var answer_array = ["INS","OOE","PD"];
var counter = 0;

$(".chest input").keyup(function(e){
	if (check_chest_answer($(this).val())){
		$(this).css("color","green");
		$(this).attr('readOnly',true);
		$(this).siblings().attr("src", "../pics/chest-open.png");
		var h1_text = createH1Element(answer_array[counter]);
		counter ++;
		$(this).parent().append(h1_text);
	}
});

function check_chest_answer(input_value){
	if ((input_value == "ceto" || input_value == "Ceto") && (!seaweed)){seaweed = true; return true;};
	if ((input_value == "anuket" || input_value == "Anuket") && (!fish)){fish = true; return true;};
	if ((input_value == "lir" || input_value == "Lir") && (!bubbles)){bubbles = true; return true;};
}

function createH1Element(text) {
    var h = document.createElement("H1");
    var t = document.createTextNode(text); 
    h.appendChild(t);
	h.classList.add("answer_text");
    return h;
} 