// ==========
// BALL STUFF
// ==========

// BIKE STUFF
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

	//Movement 
	//Left
    if (g_keys[this.GO_LEFT]) {
        this.xVel -= 1;
    } else if (g_keys[this.GO_RIGHT]) {
        this.xVel += 1;
    } else if (g_keys[this.GO_UP]) {
        this.yVel -= 1;
    } else if (g_keys[this.GO_DOWN]) {
        this.yVel += 1;
    }
    
    // Bounce off left and right edges
    if (nextX < 5 ||                             // left edge
        nextX > 395) {               // right edge
        this.xVel *= -1;
    }
	
	if (nextY < 5) {
		this.yVel *= -1;
	}

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextY > 410) {
        this.reset();
    }

	
    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

Ball.prototype.reset = function () {
    this.cx = 100;
    this.cy = 200;
    this.xVel = -1;
    this.yVel = 0;
};

Ball.prototype.render = function (ctx) {
	ctx.fillStyle = '#67C8FF';
    fillCircle(ctx, this.cx, this.cy, this.radius);
};