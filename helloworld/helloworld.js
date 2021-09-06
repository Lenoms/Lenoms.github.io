levels.one=true; 
populate_levels();
if (levels.two){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Worlds are draggable
$(function() {  
    $( ".world-pic" ).draggable({
		containment: 'body'
	});  
});