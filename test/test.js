$(function(){
	$('#light').draggable({
     start: function( event, ui ) {
         $(this).addClass('dragging'); 
     },
     stop: function( event, ui ) {
         $(this).removeClass('dragging'); 
     }
 });
});