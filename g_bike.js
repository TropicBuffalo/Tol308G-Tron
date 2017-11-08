// ==========
// BIKE STUFF
// ==========

// BIKE STUFF
//Constructor for the bike
function Bike(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Bike.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

	  //Movement for the bike
	  //Left
    if (g_keys[this.GO_LEFT]) {
		    if (this.xVel > 0) return;
		    else {
			      this.xVel = -5;
			      this.yVel = 0;
		    }
    }
	  //Right
	  else if (g_keys[this.GO_RIGHT]) {
		    if (this.xVel < 0) return;
		    else {
			      this.xVel = 5;
			      this.yVel = 0;
		    }
    }
	  //Up
	  else if (g_keys[this.GO_UP]) {
		    if (this.yVel > 0) return;
		    else {
			      this.xVel = 0;
            this.yVel = -5;
		    }
    }
	  //Down
	  else if (g_keys[this.GO_DOWN]) {
		    if (this.yVel < 0) return;
		    else {
			      this.xVel = 0;
            this.yVel = 5;
		    }
    }

    //Collision with X axis
    if (nextX < 5 || nextX > 394) {
		this.reset();
		//Reset the grid
    	for (var i = 0 ; i < 80; i++) {
    	    grid[i] = [];
    		for (var j = 0; j < 80; j++) {
				grid[i][j] = 0;
            }
        }
		for(var i = 0; i < 80; i++) {
			grid[0][i] = 3;
			grid[79][i] = 3;
			grid[i][0] = 3;
			grid[i][79] = 3;
		}
    }
	
	//Collision with Y axis
	if (nextY < 5 || nextY > 394) {
 		this.reset();
		//Reset the grid
 		for (var i = 0; i < 80; i++) {
 		    grid[i] = [];
 		    for (var j = 0; j < 80; j++) {
			grid[i][j] = 0;
            }
        }
		for(var i = 0; i < 80; i++) {
			grid[0][i] = 3;
			grid[79][i] = 3;
			grid[i][0] = 3;
			grid[i][79] = 3;
		}
	}
	//Collision with the trail, collide() is in Grid.js
	if (collide(nextX,nextY)){
    	this.reset;
		//Reset the grid
		for (var i = 0; i < 80; i++) {
 		    grid[i] = [];
 		    for (var j = 0; j < 80; j++) {
			grid[i][j] = 0;
            }
        }
		for(var i = 0; i < 80; i++) {
			grid[0][i] = 3;
			grid[79][i] = 3;
			grid[i][0] = 3;
			grid[i][79] = 3;
		}
    }
	
	//Paint the trails of the players
    var brickX = Math.floor (prevX / 5.00);
	var brickY = Math.floor (prevY / 5.00);
	if (this.player === 1) {
	    grid[brickX][brickY] = 1;
	}
    else if (this.player === 2) {
	    grid[brickX][brickY] = 2;
	}

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;


    this.cx += this.xVel;
    this.cy += this.yVel;
};

Bike.prototype.reset = function () {
    if (this.player === 1 ) {
        this.cx = 100;
        this.cy = 100;
    }

    else if (this.player === 2) {
        this.cx = 100;
        this.cy = 300;
    }
    this.xVel = 5;
    this.yVel = 0;
};

Bike.prototype.render = function (ctx) {
  	var c = this.color;
    fillBox(ctx, this.cx, this.cy, 5, 5, c);
}
