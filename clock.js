// clock.js

var DEBUG = true;

var canvas;
var ctx;

var clockFace;

// constants
var boxWidth = 100;
var textRadius = null;
var hourRad = Math.PI / 6.0;
var minuteRad = Math.PI / 30.0;
var secondRad = Math.PI / 30.0;
var centerPos = 300;

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

function drawCurrent() {
	resize_to_window();

	clockFace.setSize(boxWidth);
	clockFace.clearCtx();

	var clock = new Clock();

	clockFace.drawHands(clock);

	clockFace.drawFace();

	window.requestAnimationFrame(drawCurrent);
}

function scale_constants() {
	centerPos = boxWidth / 2.0;
	textRadius = centerPos * 0.75;
	hourHandRadius = centerPos * 0.4;
	minuteHandRadius = centerPos * 0.6;
	secondHandRadius = centerPos * 0.7;
}

function resize_to_window() {
	var windowWidth = window.innerWidth;
	var windowHieght = window.innerHeight;

	boxWidth = windowWidth > windowHieght
			? windowHieght : windowWidth;

	boxWidth -= 50.0;

	ctx.canvas.style.width = window.boxWidth + 'px';
	ctx.canvas.style.height = window.boxWidth + 'px';

	ctx.canvas.width  = window.boxWidth * window.devicePixelRatio; 
	ctx.canvas.height = window.boxWidth * window.devicePixelRatio;
	boxWidth *= window.devicePixelRatio;

	scale_constants();
}

function clock_init() {
	canvas = document.getElementById('clock_widget');
	ctx = canvas.getContext('2d');

	clockFace = new ClockFace(ctx);

	window.requestAnimationFrame(drawCurrent);
}
