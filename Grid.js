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
    for (var i=0; i < grid.length; i++) {
        for (var j=0; j < grid[i].length; j++) {
            drawBrick(i,j,grid[i][j]);
        }
    }
};
//"Draws" the bricks.
function drawBrick(x,y,type){   
    switch(type){ 
        case 0:
			g_ctx.fillStyle = 'red';
            break;
 
    }
    if (type){
        g_ctx.fillRect(x*GridWidth,y*GridHeight,GridWidth,GridHeight);
		g_ctx.strokeRect(x*GridWidth+1,y*GridHeight+1,GridWidth-2,GridHeight-2);
		
    }
}
	