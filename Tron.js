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
Trail er halinn sem kemur á eftir fyrsta "sprite-inu" er að reyna gera array sem heldur
utan um gildin og teiknar upp 10 síðustu, þá er hægt að gera collision með að vísa á þennan array.
Er ekki að ganga eins og er samt.
location er prufa fyir að geyma x og y hnit í array og það virkar.

*/

//Player 1 bike
var g_bike = new Bike({
    cx: 210,
    cy: 200,
	location:[100,100],
	
	color : "blue",
	trail : [],
    xVel: 1,
    yVel: 0,
	
	GO_LEFT   : KEY_A,
    GO_RIGHT : KEY_D,
	GO_UP   : KEY_W,
    GO_DOWN : KEY_S	
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
    g_bike.update(du);
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
	g_bike.render(ctx);

}

// Kick it off
g_main.init();