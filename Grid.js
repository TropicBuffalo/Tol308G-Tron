var GridHeight = 5;
var GridWidth = 5;
var canvasGridX = g_canvas.width/5;
var canvasGridY = g_canvas.height/5;
//Makes the array for the grid.

var grid = [];

for (var i = 0 ; i < canvasGridX; i++) {
    grid[i] = [];
    for (var j = 0; j < canvasGridY; j++) {
        grid[i][j] = 0;
    }
}
//Changed numbers to fit a "scoreboard" on the bottom while
//keeping playable dimensions the ame.
for (var i = 0; i < canvasGridX; i++) {
  	grid[i][0] = 3;
  	grid[i][canvasGridY - 11] = 3;
}
for (var i = 0; i < canvasGridY - 10; i++) {
  	grid[0][i] = 3;
  	grid[canvasGridX - 1][i] = 3;
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
function drawBrick(x, y, type) {
    switch (type) {
			  case 3:
      			g_ctx.fillStyle = '#39FF14';
      			break;
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
};

//Collision stuff.
function collide(nextX, nextY) {
  	var brickX = Math.floor (nextX / GridWidth);
  	var brickY = Math.floor (nextY / GridHeight);
  	if (grid[brickX][brickY] != 0) {
        return true;
    }
    return false;
};
