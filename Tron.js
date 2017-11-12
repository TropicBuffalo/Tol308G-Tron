"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
g_ctx.font="Bold 20px Arial";

var audio = new Audio("Tron_start.wav")
audio.muted = true;
audio1.muted = true;
audio.currentTime = 0;
audio.play();

var timer = setInterval(function() { if (!g_isUpdatePaused) {
    timer += 100;
  }
}, 100);

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


//Byrjar á 1 í stað 0 svo setjum 0 í byrjun
timer = 0;
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
g_main.init();
