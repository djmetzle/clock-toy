// ClockFace Object

var HOUR_HAND_COLOR = "#000000";
var MINUTE_HAND_COLOR = "#000000";
var SECOND_HAND_COLOR = "#FF0000";

const NUMERAL_ANGLE = Math.PI / 6.0;

function ClockFace(draw_ctx) {
	this.ctx = draw_ctx;
}

ClockFace.prototype.clearCtx = function() {
	this.ctx.globalCompositeOperation = 'source-over';
	this.ctx.clearRect(0, 0, this.size, this.size); // clear canvas
}

ClockFace.prototype.setSize = function(size) {
	this.size = size;
	this.scaleConsts();
}

ClockFace.prototype.scaleConsts = function() {
	this.centerPos = this.size / 2.0;

	this.faceRadius = this.centerPos*0.85;
	this.edgeRadius = this.centerPos*0.90;
	this.faceWidth = this.centerPos*0.01;

	this.numeralRadius = this.centerPos * 0.75; 

	this.hourRadius = this.centerPos * 0.45;
	this.minuteRadius = this.centerPos * 0.6;
	this.secondRadius = this.centerPos * 0.7;

	this.hourWidth = this.centerPos*0.01;
	this.minuteWidth = this.centerPos*0.01;
	this.secondWidth = this.centerPos*0.008;

	this.ctx.shadowColor = '#111';
	this.ctx.shadowBlur = 10;
	this.ctx.shadowOffsetX = this.faceWidth;
	this.ctx.shadowOffsetY = this.faceWidth;
}

ClockFace.prototype.drawFace = function() {
	this.ctx.lineWidth=this.faceWidth;
	this.ctx.strokeStyle="#000";
	this.ctx.shadowColor = '#111';
	this.ctx.shadowBlur = 10;
	this.ctx.shadowOffsetX = this.faceWidth;
	this.ctx.shadowOffsetY = this.faceWidth;
	this.ctx.beginPath();
	this.ctx.arc(this.centerPos,this.centerPos,this.faceRadius, 0, 2.0*Math.PI, false);
	this.ctx.stroke();

	this.ctx.lineWidth=this.faceWidth / 2.0;
	this.ctx.strokeStyle="#000000";
	this.ctx.beginPath();
	this.ctx.arc(this.centerPos,this.centerPos,this.edgeRadius, 0, 2.0*Math.PI, false);
	this.ctx.stroke();

	this.ctx.fillStyle='#333';
	this.ctx.beginPath();
	this.ctx.arc(this.centerPos,this.centerPos,this.faceWidth * 2.0, 0, 2.0*Math.PI, false);
	this.ctx.fill();

	this.drawNumerals();
}

ClockFace.prototype.drawNumerals = function() {
	fontSize = this.centerPos / 10.0;
	this.ctx.lineWidth=2.0;
	this.ctx.strokeStyle="#000000";
	this.ctx.font = fontSize + 'px serif';
	this.ctx.textAlign = 'center';

	for (var i=1; i <= 12; i++) {
		// rotate PI/4 counterclockwise
		var angle = i * NUMERAL_ANGLE - Math.PI / 2.0;
		var x = this.centerPos + this.numeralRadius * Math.cos(angle);
		var y = this.centerPos + this.numeralRadius * Math.sin(angle);
		// baseline fix
		y += fontSize / 4.0;
		this.ctx.fillText(i, x,y);
	}
}


ClockFace.prototype.drawHands = function(clock) {
	this.drawHourHand(clock);
	this.drawMinuteHand(clock);
	this.drawSecondHand(clock);
}

ClockFace.prototype.drawHourHand = function(clock) {
	var hourAngle = clock.hourAngle - Math.PI / 2.0;
	this.drawHand(hourAngle, this.hourRadius, this.hourWidth, HOUR_HAND_COLOR);
}

ClockFace.prototype.drawMinuteHand = function(clock) {
	var minuteAngle = clock.minuteAngle - Math.PI / 2.0;
	this.drawHand(minuteAngle, this.minuteRadius, this.minuteWidth, MINUTE_HAND_COLOR);
}

ClockFace.prototype.drawSecondHand = function(clock) {
	var secondAngle = clock.secondAngle - Math.PI / 2.0;
	this.drawHand(secondAngle, this.secondRadius, this.secondWidth, SECOND_HAND_COLOR);
}

ClockFace.prototype.drawHand = function(angle, radius, width, color) {
	var tip_x = this.centerPos + radius * Math.cos(angle);
	var tip_y = this.centerPos + radius * Math.sin(angle);
	var t_x = this.centerPos - radius * 0.25 * Math.cos(angle);
	var t_y = this.centerPos - radius * 0.25 * Math.sin(angle);
	var l_x = t_x + width * Math.cos(angle + Math.PI / 2.0);
	var l_y = t_y + width * Math.sin(angle + Math.PI / 2.0);
	var r_x = t_x - width * Math.cos(angle + Math.PI / 2.0);
	var r_y = t_y - width * Math.sin(angle + Math.PI / 2.0);
	this.ctx.lineWidth=width;
	this.ctx.fillStyle=color;
	this.ctx.beginPath();
	this.ctx.moveTo(tip_x, tip_y);
	this.ctx.lineTo(l_x, l_y);
	this.ctx.lineTo(r_x, r_y);
	this.ctx.fill();		
}

