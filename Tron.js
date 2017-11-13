"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
g_ctx.font="Bold 20px Arial";

var timer = setInterval(function() { 
	if (!g_isUpdatePaused) {
		timer += 100;
	}
}, 100);

//Byrjar á 1 í stað 0 svo setjum 0 í byrjun
timer = 0;

//Audio related things
var audio = new Audio("Tron_start.wav")
audio.muted = true;
audio1.muted = true;
audio.currentTime = 0;
audio.play();

//Radio button kallar á þetta til að mute-a / unmute-a.
function mutesound() {
	if(document.getElementById("1").checked === true) {
		audio.muted = false;
		audio1.muted = false;
	}
	else if(document.getElementById("2").checked === true) {
		audio.muted = true;
		audio1.muted = true;
	}
}
// START OF THE MAIN SCREEN
var mouse;
var startScreen;

function beginLoop() {
  var frameId = 0;
  var lastFrame = Date.now();

  function loop() {
    var thisFrame = Date.now();
    var elapsed = thisFrame - lastFrame;
    frameId = window.requestAnimationFrame(loop);
    startScreen.update(elapsed);
    startScreen.draw(g_ctx);
    lastFrame = thisFrame;
  }

  loop();
}

mouse = (function (target) {
  var isButtonDown = false;
  target.addEventListener('mousedown', function () {
    isButtonDown = true;
  });
  target.addEventListener('mouseup', function () {
    isButtonDown = false;
  });

  return {
    isButtonDown: function () {
      return isButtonDown;
    }
  };
}(document));

startScreen = (function (input) {
  var hue = 0;
  var direction = 1;
  var transitioning = false;
  var wasButtonDown = false;
  var title = 'Tron';

  function centerText(ctx, text, y) {
    var measurement = ctx.measureText(text);
    var x = (ctx.canvas.width - measurement.width) / 2;
    ctx.fillText(text, x, y);
  }

  function draw(ctx, elapsed) {

    var y = ctx.canvas.height / 2;
    var color = 'rgb(0,' + hue + ',0)';

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#39FF14';
    ctx.font = '48px monospace';
    centerText(ctx, title, y);

    ctx.fillStyle = color;
    ctx.font = '24px monospace';
    centerText(ctx, 'click to begin', y + 30);
  }

  function update() {
    hue += 1 * direction;
    if (hue > 255) direction = -1;
    if (hue < 1) direction = 1;
    var isButtonDown = input.isButtonDown();
    var mouseJustClicked = !isButtonDown && wasButtonDown;

    if (mouseJustClicked && !transitioning) {
      transitioning = true;
      g_main.init();
    }
    wasButtonDown = isButtonDown;
  }
  return {
    draw: draw,
    update: update
  };
}(mouse));

// END OF THE MAIN SCREEN
/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// BIKE STUFF
// ============

//Player 1 Movement keys
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);

/*
Bætti við AI : true/false

*/

//Player 1 bike
var g_bike1 = new Bike({
    cx: 50,
    cy: 50,
    width: 5,
    height: 5,
    color : "blue",
	player : 1,
	AI : false,
    xVel: 5,
    yVel: 0,
	GO_LEFT   : KEY_A,
    GO_RIGHT : KEY_D,
	GO_UP   : KEY_W,
    GO_DOWN : KEY_S
});

//Player 2
var KEY_LeftA = 37;
var KEY_RightA = 39;
var KEY_UpA = 38;
var KEY_DownA = 40;

var g_bike2 = new Bike({
    cx: 550,
    cy: 550,
    width: 5,
    height: 5,
	color : "red",
	player : 2,
	AI : true,
    xVel: -5,
    yVel: 0,

	GO_LEFT   : KEY_LeftA,
    GO_RIGHT : KEY_RightA,
	GO_UP   : KEY_UpA,
    GO_DOWN : KEY_DownA
});

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    g_bike1.update(du);
	  g_bike2.update(du);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    createBricks();
	  g_bike1.render(ctx);
    g_bike2.render(ctx);
	  g_ctx.fillText("Score : " + timer, 20, 630);
}

// Kick it off
beginLoop();