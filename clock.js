// clock.js

var DEBUG = true;

var canvas;
var ctx;

// constants
var boxWidth = 100;
var textRadius = null;
var hourRad = Math.PI / 6.0;
var minuteRad = Math.PI / 30.0;
var secondRad = Math.PI / 30.0;
var centerPos = 300;

var hourHandRadius = 100;
var hourHandWidth = 6.0;
var hourHandColor = "#000000";

var minuteHandRadius = 150;
var minuteHandWidth = 5.0;
var minuteHandColor = "#000000";

var secondHandRadius = 180;
var secondHandWidth = 2.0;
var secondHandColor = "#FF0000";

function draw_face() {
	draw_edge();
	draw_numerals();

}

function draw_edge() {
	ctx.lineWidth=4.0;
	ctx.strokeStyle="#000000";
	ctx.beginPath();
	ctx.arc(centerPos,centerPos,centerPos * 0.85, 0, 2.0*Math.PI, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(centerPos,centerPos,5, 0, 2.0*Math.PI, false);
	ctx.fill();
}

function draw_numerals() {
	ctx.lineWidth=2.0;
	ctx.strokeStyle="#000000";
	ctx.font = '32px serif';
	ctx.textAlign = 'center';

	for (var i=1; i <= 12; i++) {
		// rotate PI/4 counterclockwise
		var angle = i * hourRad - Math.PI / 2.0;
		var x = centerPos + textRadius * Math.cos(angle);
		var y = centerPos + textRadius * Math.sin(angle);
		// baseline fix
		y += 8;
		ctx.fillText(i, x,y);
	}
}

function draw_time_string(timeStr) {
	ctx.lineWidth=1.0;
	ctx.strokeStyle="#000000";
	ctx.font = '18px serif';
	ctx.textAlign = 'center';
	ctx.fillText(timeStr, centerPos, boxWidth-10);
}

function draw_hand(x,y,thickness, color) {
	ctx.lineWidth=thickness;
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(centerPos, centerPos);
	ctx.lineTo(x, y);
	ctx.stroke();		
}

function draw_hands(hour,min,sec) {
	drawHour(hour);
	drawMinute(min);
	drawSecond(sec);
}

function drawHour(hour) {
	var hourAngle = hour * hourRad - Math.PI / 2.0;
	var x = centerPos + hourHandRadius * Math.cos(hourAngle);
	var y = centerPos + hourHandRadius * Math.sin(hourAngle);
	draw_hand(x,y,hourHandWidth, hourHandColor);
}

function drawMinute(minute) {
	var minuteAngle = minute * minuteRad - Math.PI / 2.0;
	var x = centerPos + minuteHandRadius * Math.cos(minuteAngle);
	var y = centerPos + minuteHandRadius * Math.sin(minuteAngle);
	draw_hand(x,y,minuteHandWidth, minuteHandColor);
}

function drawSecond(second) {
	var secondAngle = second * secondRad - Math.PI / 2.0;
	var x = centerPos + secondHandRadius * Math.cos(secondAngle);
	var y = centerPos + secondHandRadius * Math.sin(secondAngle);
	draw_hand(x,y,secondHandWidth, secondHandColor);
}


function drawCurrent() {
	resize_to_window();
	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0, 0, boxWidth, boxWidth); // clear canvas

	draw_face();

	date = new Date();
	var timeStr = date.toString();
	draw_time_string(timeStr);

	var hour = date.getHours() % 12;
	var minute = date.getMinutes();
	var second = date.getSeconds();

	var hourFrac = minute / 60.0;
	var minuteFrac = second / 60.0;
	var secFrac = date.getMilliseconds() / 1000.0;

	draw_hands(hour+hourFrac,minute+minuteFrac,second+secFrac);

	window.requestAnimationFrame(drawCurrent);
}

function scale_constants() {
	centerPos = boxWidth / 2.0;
	textRadius = centerPos * 0.75;
	hourHandRadius = centerPos * 0.4;
	minuteHandRadius = centerPos * 0.6;
	secondHandRadius = centerPos * 0.65;
}

function resize_to_window() {
	var windowWidth = window.innerWidth;
	var windowHieght = window.innerHeight;

	boxWidth = windowWidth > windowHieght
			? windowHieght : windowWidth;

	boxWidth -= 50.0;

	ctx.canvas.width  = window.boxWidth
	ctx.canvas.height = window.boxWidth;

	scale_constants();
}

function clock_init() {
	canvas = document.getElementById('clock_widget');
	ctx = canvas.getContext('2d');


	window.requestAnimationFrame(drawCurrent);
}
