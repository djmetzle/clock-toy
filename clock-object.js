// Clock Object

//
var HOUR_RAD = Math.PI / 6.0;
var MINUTE_RAD = Math.PI / 30.0;
var SECOND_RAD = Math.PI / 30.0;

function Clock() {
	this.updateTime();
}

Clock.prototype.updateTime = function() {
	this.time = new Date();
	this.extractTime();
	this.recalculateAngles();
}

Clock.prototype.extractTime = function() {
	this.hour = this.time.getHours();
	this.minute = this.time.getMinutes();
	this.second = this.time.getSeconds();
	this.millisec = this.time.getMilliseconds();

	// This could be 24 hour?
	this.hour %= 12;
}

Clock.prototype.recalculateAngles = function() {
	var hourFrac = this.minute / 60.0;
	var mintueFrac = this.second / 60.0;
	var secFrac = this.millisec / 1000.0;

	this.hourAngle = (this.hour + hourFrac) * HOUR_RAD;
	this.minuteAngle = (this.minute + minuteFrac) * MINUTE_RAD;
	this.secondAngle = (this.second + secFrac) * SECOND_RAD;
}
