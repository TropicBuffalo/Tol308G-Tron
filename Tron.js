"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");


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
Trail er halinn sem kemur á eftir fyrsta "sprite-inu". 
Hér eru trailX og trailY Array sem halda utan um X- og Y-hnit halans.
Lengd halans eru ákvörðuð af trailLength.
*/

//Player 1 bike
var g_bike1 = new Bike({
    cx: 100,
    cy: 200,
	color : "blue",
	/*
	trailLength: 1000,
	trailX : [],
	trailY : [],
	*/
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
    cx: 300,
    cy: 100,
	color : "red",
	/*
	trailLength: 1000,
	trailX : [],
	trailY : [],
	*/
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
	g_bike1.render(ctx);
	g_bike2.render(ctx);

}

// Kick it off
g_main.init();
