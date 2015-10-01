function go() {
	
	$("section").slideUp();
	
	if (!hasGetUserMedia())
	{
		complain();
	}
	else 
	{
		beUnsure();
	}
	
	
}

function complain(){
	$("#complainer").slideDown();
}

function beUnsure()
{
	$("#unsure").slideDown();
}

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

$(document).ready(function(){
go();
});