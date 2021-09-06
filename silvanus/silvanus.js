levels.three=true; 
populate_levels();
if (levels.four){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

let answer_string = "Crime writer Ellison Oswalt moves his family into a house where a horrific crime took place earlier, but his family doesn't know. He begins researching the crime in hopes of writing a book about it. Oswalt examines video footage that he finds in the house to help him in his research, but he soon discovers more than he bargained for. "

let answer_string_index = 0;
let output_string = '';
let string_length = 0;
$("#xx").on("input", function(){
	if ($(this).val().length < string_length){
		string_diff = string_length - $(this).val().length;
		output_string = output_string.slice(0, -string_diff); 
		string_length -= string_diff;
	}
	else{
		if($(this).val()[$(this).val().length-1] == 'x'){
			output_string += answer_string[answer_string_index];
			answer_string_index ++;
			if (answer_string_index == answer_string.length){
				answer_string_index = 0;
			}
		}
		else{
			output_string += $(this).val()[$(this).val().length-1];
		}
		string_length ++;
	}
    document.getElementById('xxx').innerHTML = output_string;
});