var GridHeight = 5;
var GridWidth = 5;

//Makes the array for the grid.

var grid = [];
for (var i = 0 ; i < 80; i++) {
    grid[i] = [];
    for (var j = 0; j < 80; j++) {
        grid[i][j] = 0;
    }
}


//Creates the bricks.
function createBricks() {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            drawBrick(i, j, grid[i][j]);
        }
    }
};

//"Draws" the bricks.
function drawBrick(x, y, type){
    switch (type) {
    		case 2:
      			//Color does nothing, just there for the type.
      			g_ctx.fillStyle = 'red';
      			break;
    		case 1:
      			//Color does nothing, just there for the type.
      			g_ctx.fillStyle = 'blue';
      			break;
                default:
                    break;

    }

    if (type) {
        g_ctx.fillRect(x * GridWidth, y * GridHeight, GridWidth, GridHeight);
		    g_ctx.strokeRect(x * GridWidth + 1, y * GridHeight + 1, GridWidth - 2, GridHeight - 2);
    }
}

//Collision stuff.
function collide(nextX,nextY){
  	var brickX = Math.floor (nextX / GridWidth);
  	var brickY = Math.floor (nextY / GridHeight);
  	if (grid[brickX][brickY]) {
        return true;
    }
    return false;
}

//Can use this to create trail.
function makeTrail(i, j, a) {
  	if (a === 1) {
  		grid[i][j] = 1;
  	}
  	if (a === 2) {
  		grid[i][j] = 2;
  	}
  	if (a === 3) {
  		grid[i][j] = 3;
  	}
  	if (a === 4) {
  		grid[i][j] = 4;
  	}
}
