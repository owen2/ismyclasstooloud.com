function go() {
	
	$("#complainer").slideUp();
	
	if (!navigator.getUserMedia)
	{
		complain();
	}
	else 
	{
		var mysteryObject = getUserMedia();
	}
	
	
}

function complain(){
	
}
go();