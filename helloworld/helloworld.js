levels.one=true; 
populate_levels();
if (levels.two){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

// Change heading text as of level 12. Part of game plot.
if (levels.twelve){
	$('#heading').html('dlrow ruoy ot eybdoog yaS');
}

// Worlds are draggable
$(function() {  
    $( ".world-pic" ).draggable({
		containment: 'body'
	});  
});