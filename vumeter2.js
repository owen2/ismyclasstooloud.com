angular.module('vumeter', [])
	.controller('mainController', function ($scope, $interval) {
		this.deviceStatus = "Loading...";
		this.loudnessLevel = "an unknown loudness";
		this.history = [];
		this.peakDebug = 0.0;

		if (!!!(navigator.mediaDevices.getUserMedia)) {
			this.deviceStatus = "This browser is not supported.";
		}
		else {
			this.deviceStatus = "Please give me access to your mic.";
			var controller = this;
			navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function (stream) {
				controller.deviceStatus = "";
				var c = controller;
				this.rawData = new Float32Array(44100);
				this.audioContext = new AudioContext();
				this.analyser = this.audioContext.createAnalyser();
				this.audioContext.createMediaStreamSource(stream).connect(this.analyser);
				$interval(function () {
					this.analyser.getFloatTimeDomainData(this.rawData);
					var peak = Math.max.apply(Math, this.rawData);
					c.peakDebug = peak;
					c.history.push(peak);
					if (peak > .8) {
						c.loudnessLevel = "loud!";
					}
					else {
						c.loudnessLevel = "not very loud.";
					}
				}, 1000);
			});
		}
	});