levels.eight=true; 
populate_levels();
if (levels.nine){
	document.getElementById('forward-arrow').src = "../pics/forward-arrow.png"
}
else{
	document.getElementById('forward-arrow').src="../pics/greyed-arrow.png"
}

$('#silvanus').click(function(){
	alert("Silvanus: 'Are you okay? I saw that explosion up ahead. I'm going back home to check on my house. I don't know who could be causing such havoc...I hope <its> not back. Are you heading east? You'll need a map to continue that way.")
})