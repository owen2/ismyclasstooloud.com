function go() {
	
	$("section").slideUp();
	
	if (!hasGetUserMedia())
	{
		complain();
	}
	else 
	{
		navigator.mediaDevices.getUserMedia( {audio:true, video:false}).then(function(stream)
		{
		var rawData = new Float32Array(204800);
		var audioContext = new AudioContext();
		var analyser = audioContext.createAnalyser();
		audioContext.createMediaStreamSource(stream).connect(analyser); 
		setInterval(function (){
			analyser.getFloatTimeDomainData(rawData);
			var peak = Math.max.apply(Math,rawData);
			$("#title").html(peak);
			updateLoudness(peak);
		}, 1000);
		});
		
		beUnsure();
	}
	

}

function complain(){
	$("#complainer").slideDown();
}

function updateLoudness(level){
	if (level > .8)	{
		$("section").not("#loudest").slideUp();
		$("#loudest").slideDown();
	}	
	else if (level > .6)	{
		$("section").not("#louderer").slideUp();
		$("#louderer").slideDown();
	}	
	else if (level > .5)	{
		$("section").not("#louder").slideUp();
		$("#louder").slideDown();
	}	
	else if (level > .4)	{
		$("section").not("#loud").slideUp();
		$("#loud").slideDown();
	}	
	else {
		$("section").not("#notloud").slideUp();
		$("#notloud").slideDown();
	}	
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