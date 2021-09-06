levels.twelve=true; 
populate_levels();
if (levels.thirteen){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

$('.clue').click(function(){
	console.log("HI");
	$(this).toggleClass("clue-big");
});
