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
			this.xVel = -1;
			this.yVel = 0;
		}
    } 
	//Right
	else if (g_keys[this.GO_RIGHT]) {
		if (this.xVel < 0) return;
		else {
			this.xVel = 1;
			this.yVel = 0;
		}
    } 
	//Up
	else if (g_keys[this.GO_UP]) {
		if (this.yVel > 0) return;
		else {
			this.yVel = -1;
			this.xVel = 0;
		}
    } 
	//Down
	else if (g_keys[this.GO_DOWN]) {
		if (this.yVel < 0) return;
		else {
			this.yVel = 1;
			this.xVel = 0;
		}
    }
    
    // Bounce off left and right edges
    if (nextX < 5 ||                 // left edge
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

	
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
	
	this.location[0] += this.xVel*du;
	this.location[1] += this.yVel*du;
	
	//Er að reyna búa til halann með að setja gildin inn í array, er ekki að virka
	this.trail.push(this.location);
	console.log(this.trail);
};

Bike.prototype.reset = function () {
    this.cx = 100;
    this.cy = 200;
    this.xVel = -1;
    this.yVel = 0;
};

Bike.prototype.render = function (ctx) {
	var c = this.color;
    fillBox(ctx, this.cx, this.cy, 10,10, c);
	fillBox(ctx, this.location[0] ,this.location[1] ,10 ,10 ,c);
	//Er að reyna fá array sem heldur um a.m.k 10 gildi og teikna síðan 10 síðustu gildi sem halann
	//fillBox(ctx, this.trail[0][0] ,this.trail[0][1] ,10 ,10 ,c);

};