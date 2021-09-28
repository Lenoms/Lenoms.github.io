levels.twelve=true; 
populate_levels();
if (levels.thirteen){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Click clue on table to make it bigger!
$('.clue').click(function(){
	$(this).toggleClass("clue-big");
});
