angular.module('vumeter',[])
.controller('mainController',["$scope",function($scope){
	this.status= "Please give me access to your mic.";
	this.loudnessLevel="an unknown loudness";
	this.history = [];
	this.peakDebug = 0.0;
	
	this.loudnessLevel = "not getting updated.";
	if (!!!(navigator.mediaDevices.getUserMedia))
	{
		this.status = "This browser is not supported.";
	}
	else
	{
		navigator.mediaDevices.getUserMedia( {audio:true, video:false}).then(function(stream)
		{
			this.rawData = new Float32Array(2048);
			this.audioContext = new AudioContext();
			this.analyser = this.audioContext.createAnalyser();
			this.audioContext.createMediaStreamSource(stream).connect(this.analyser); 
			setInterval(function (){
				this.analyser.getFloatTimeDomainData(this.rawData);
				var peak = Math.max.apply(Math,this.rawData);
				$scope.$apply(function(){
					$scope.peakDebug = peak;
					if (peak > .5){
						$scope.loudnessLevel= "loud!";
					}
					else{
						$scope.loudnessLevel = "not so loud.";
					}
				});
			}, 1000);
		});
	}
}]);