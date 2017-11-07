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
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

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

    // Bounce off left and right edges
    if (nextX < 0 ||                 // left edge
        nextX > g_canvas.width) { // right edge
    		/*
    		window.alert("Dead");
    		*/
    		this.reset();
    		for (var i = 0 ; i < 80; i++) {
    		    grid[i] = [];
    			  for (var j = 0; j < 80; j++) {
    				    grid[i][j] = 0;
            }
        }
    }

    // Bounce off top and bottom edges
	  if (nextY < 0 ||
        nextY > g_canvas.height) {
  			/*
  			window.alert("Dead");
  			*/
  			this.reset();
  			for (var i = 0; i < 80; i++) {
  			    grid[i] = [];
  			    for (var j = 0; j < 80; j++) {
  				      grid[i][j] = 0;
            }
        }

  			/*
  		    this.yVel *= -1;
  			*/
	  }
    /*
    	//Collision stuff.
    	if (collide(nextX,nextY)){
    		window.alert("collision");
    	}
    */
	  if (trailPaint(prevX, prevY)) {
		    drawBrick(prevX, prevY, 1);
	  }

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;


    this.cx += this.xVel * du;
    this.cy += this.yVel * du;

  	//Núverandi hnit eru "pushuð" inní trailX og trailY.
  	//Ef annarhvor "Array-inn" verður lengri en trailLength:
  	//Framkvæmum við Array.shift();
    /*
  	this.trailX.push(this.cx);
  	this.trailY.push(this.cy);

  	if (this.trailX.length > this.trailLength)
  		  this.trailX.shift();
  	if (this.trailY.length > this.trailLength)
  		  this.trailY.shift();
	  */
};

Bike.prototype.reset = function () {
    this.cx = 100;
    this.cy = 200;
    this.xVel = 5;
    this.yVel = 0;
};

Bike.prototype.render = function (ctx) {
	var c = this.color;
    fillBox(ctx, this.cx, this.cy, 5, 5, c);
/*
	  for (var i = 0; i < this.trailX.length; i++) {
		    fillBox(ctx, this.trailX[i], this.trailY[i], 5, 5, c);
	  }
*/
  	//Hér er framkvæmt fillBox á hvert gildi í trailX og trailY
  	//Út kemur hali
};
/*
Bike.prototype.collidesWith = function (prevX, prevY,
                                          nextX, nextY) {
    var bikeEdge = this.cy;
    // Check X coords
    if ((nextY < bikeEdge && prevY >= bikeEdge) ||
        (nextY > bikeEdge && prevY <= bikeEdge)) {
        // Check Y coords
        if (nextX + 5 >= this.cx &&
            nextX - 5 <= this.cx) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};
*/
