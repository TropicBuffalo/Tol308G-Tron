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

var audio1 = new Audio("Tron_Death.wav");

Bike.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

	  //Movement for the bike
	  //Left
  	//Getur bara notað keyboard input ef AI er false
  	if (this.AI === false) {
  		  if (g_keys[this.GO_LEFT]) {
  			     if (this.xVel === 0) {
  					     this.xVel = -5;
  					     this.yVel = 0;
  			     }
  		  }
  		  //Right
  	    else if (g_keys[this.GO_RIGHT]) {
  		      if (this.xVel === 0) {
  					     this.xVel = 5;
  					     this.yVel = 0;
  			    }
  		  }
    		//Up
    		else if (g_keys[this.GO_UP]) {
  			    if (this.yVel === 0){
  					     this.xVel = 0;
  					     this.yVel = -5;
  			    }
  		  }
  		  //Down
  		  else if (g_keys[this.GO_DOWN]) {
  			    if (this.yVel === 0) {
  				       this.xVel = 0;
  				       this.yVel = 5;
  			    }
  		  }
  	}

  	//Byrjun á AI
  	if (this.AI === true) {
        this.ai();
    }

    //Collision with X axis
    if (nextX < 5 || nextX > g_canvas.length - 6) {
  	    this.reset();
  	    //Reset the grid
    	  for (var i = 0 ; i < canvasGridX; i++) {
    		    for (var j = 0; j < canvasGridY; j++) {
  			        if (grid[i][j] !== 3)
  				          grid[i][j] = 0;
            }
        }
    }

  	//Collision with Y axis
  	if (nextY < 5 || nextY > g_canvas.height - 6) {
   		  this.reset();
  		  //Reset the grid
   		  for (var i = 0; i < canvasGridX; i++) {
   		      for (var j = 0; j < canvasGridY; j++) {
  				      if (grid[i][j] !== 3)
  					        grid[i][j] = 0;

            }
        }
  	}

  	//Collision with the trail, collide() is in Grid.js
  	if (collide(nextX, nextY)) {
      	this.reset();
  		  //Reset the grid
  		  for (var i = 0; i < canvasGridX; i++) {
   		      for (var j = 0; j < canvasGridY; j++) {
  				      if (grid[i][j] !== 3)
  					        grid[i][j] = 0;
            }
        }
    }

  	//Paint the trails of the players
    var brickX = Math.floor (this.cx / 5.00);
  	var brickY = Math.floor (this.cy / 5.00);
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
    g_bike1.cx = 50;
    g_bike1.cy = 50;
		g_bike1.xVel = 5;
		g_bike1.yVel = 0;

    g_bike2.cx = 550;
    g_bike2.cy = 550;
		g_bike2.xVel = -5;
		g_bike2.yVel = 0;

		audio1.play();
		//alert("You have died. \nYour score was = " + timer);
		//g_isUpdatePaused = true;
		//beginLoop();
		timer = 0;
};

Bike.prototype.render = function (ctx) {
  	//var c = this.color;
    fillBox(ctx, this.cx, this.cy, 5, 5, this.color);
};



//Function for AI
Bike.prototype.ai = function () {

    var direction = Math.random();
	  var collition = 0;
    var prevX = this.cx;
    var prevY = this.cy;

	  var X = Math.round (prevX / 5.00);
  	var Y = Math.round (prevY / 5.00);

    // Compute my provisional new position (barring collisions)
    var nextnextX = prevX + this.xVel * 2;
    var nextnextY = prevY + this.yVel * 2;
	  var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

  	//Check where player 1 is
  	var checkCx = this.cx - g_bike1.cx;
  	var checkCy = this.cy - g_bike1.cy;

  	//What to do if collision
  	if (collide(nextX, nextY) || collide(nextnextX, nextnextY)) {
		    console.log("collition");

        //If the AI is going LEFT and hits collision ...
    		if (this.xVel === -5) {

      			//...50% chance it will check if DOWN is viable
      			if (grid[X][Y+1] === 0 && checkCy < 0) {
        				this.xVel = 0;
        				this.yVel = 5;
			      }

      			//Check if it can go UP
      			else if (grid[X][Y-1] === 0) {
        				this.xVel = 0;
        				this.yVel = -5;
			      }
      			/*
      			//Check if it can go DOWN
      			else if(grid[X][Y+1] === 0) {
      				this.xVel = 0;
      				this.yVel = 5;
      			}
      			*/

      			console.log('xvel = ' + this.xVel);
      			console.log('yvel = ' + this.yVel);
		    }

    		//If the AI is going DOWN and hits collision ...
    		else if (this.yVel === 5 ) {
      			//...50% it will go RIGHT if viable
      			if (grid[X+1][Y] === 0 && checkCx < 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }

      			//Check if it can go LEFT
      			else if (grid[X-1][Y] === 0){
        				this.xVel = -5;
        				this.yVel = 0;
			      }
      			/*
      			//Check if it can go RIGHT
      			else if(grid[X+1][Y] === 0) {
      				this.xVel = 5;
      				this.yVel = 0;
      			}
      			*/
		    }

    		//If the AI is going RIGHT and hits collision ...
    		else if (this.xVel === 5) {
      			//...50% chance it will go UP if viable
      			if (grid[X][Y-1] === 0 && checkCy > 0) {
        				this.xVel = 0;
        				this.yVel = -5;
			      }

      			//Check if it can go DOWN
      			else if (grid[X][Y+1] === 0) {
        				this.xVel = 0;
        				this.yVel = 5;
			      }
      			/*
      			//Check if it can go UP
      			else if(grid[X][Y-1] === 0) {
      				this.xVel = 0;
      				this.yVel = -5;
      			}
      			*/
		    }

    		//If the AI is going UP and hits collision ...
    		else if (this.yVel === -5) {
      			//50% chance it will go LEFT if viable
      			if (grid[X-1][Y] === 0 && checkCx > 0) {
        				this.xVel = -5;
        				this.yVel = 0;
			      }
      			//Check if it can go RIGHT
      			else if (grid[X+1][Y] === 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }
      			/*
      			//Check if it can go LEFT
      			else if(grid[X-1][Y] === 0) {
      				this.xVel = -5;
      				this.yVel = 0;
      			}
      			*/
		    }
		    collition = 1;
	  }

  	//What to do if no collition
  	//Will change direction 20% of the time
  	if (collition === 0 && Math.random() < 0.1) {

      	//if player1 is down to your right
      	//go either down or right
    		if (checkCx < 0 && checkCy < 0) {
			      if (direction > 0.5 && this.xVel !== -5 && grid[X+1][Y] === 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }

            else if (this.yVel !== -5 && grid[X][Y+1] === 0) {
        				this.xVel = 0;
        				this.yVel = 5;
			      }

			      else if (this.xVel !== -5 && grid[X+1][Y] === 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }
		    }

      	//if player1 is up to your right
      	//go either up or right
      	else if (checkCx < 0 && checkCy > 0) {
			      if (direction > 0.5 && this.xVel !== -5 && grid[X+1][Y] === 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }

			      else if (this.yVel !== 5 && grid[X][Y-1] === 0) {
        				this.xVel = 0;
        				this.yVel = -5;
			      }

			      else if (this.xVel !== -5 && grid[X+1][Y] === 0) {
        				this.xVel = 5;
        				this.yVel = 0;
			      }
		    }

      	//if player1 is down to your left
      	//go either down or left
		    else if (checkCx > 0 && checkCy < 0) {
			      if (direction > 0.5 && this.xVel !== 5 && grid[X-1][Y] === 0) {
        				this.xVel = -5;
        				this.yVel = 0;
			      }

			      else if (this.yVel !== -5 && grid[X][Y+1] === 0) {
        				this.xVel = 0;
        				this.yVel = 5;
			      }

			      else if (this.xVel !== 5 && grid[X-1][Y] === 0) {
        				this.xVel = -5;
        				this.yVel = 0;
			      }
		    }

      	//if player1 is up to your left
      	//go up or left
		    else if (checkCx > 0 && checkCy > 0) {
			      if (direction > 0.5 && this.xVel !== 5 && grid[X-1][Y] === 0) {
        				this.xVel = -5;
        				this.yVel = 0;
			      }

			      else if (this.yVel !== 5 && grid[X][Y-1] === 0) {
        				this.xVel = 0;
        				this.yVel = -5;
			      }

			      else if (this.xVel !== 5 && grid[X-1][Y] === 0) {
        				this.xVel = -5;
        				this.yVel = 0;
			      }
		    }

    		//check new nextX and nextY
    		nextnextX = prevX + this.xVel * 2;
    		nextnextY = prevY + this.yVel * 2;
    		nextX = prevX + this.xVel;
    		nextY = prevY + this.yVel;

    		//doublecheck collition with new prediction coordinates
    		if (collide(nextX, nextY) || collide(nextnextX, nextnextY )) {
			      console.log("collition");

            //If the AI is going LEFT and hits collision ...
    		    if (this.xVel === -5) {

        				//...50% chance it will check if DOWN is viable
        				if (grid[X][Y+1] === 0 && direction > 0.5) {
          					this.xVel = 0;
          					this.yVel = 5;
    				    }

        				//Check if it can go UP
        				else if (grid[X][Y-1] === 0) {
          					this.xVel = 0;
          					this.yVel = -5;
    				    }

        				//Check if it can go DOWN
        				else if (grid[X][Y+1] === 0) {
          					this.xVel = 0;
          					this.yVel = 5;
    				    }
        				console.log('xvel = ' + this.xVel);
        				console.log('yvel = ' + this.yVel);
    			  }

      			//If the AI is going DOWN and hits collision ...
      			else if (this.yVel === 5 ) {

        				//...50% it will go RIGHT if viable
        				if (grid[X+1][Y] === 0 && direction > 0.5) {
          					this.xVel = 5;
          					this.yVel = 0;
				        }

        				//Check if it can go LEFT
        				else if (grid[X-1][Y] === 0) {
          					this.xVel = -5;
          					this.yVel = 0;
				        }

        				//Check if it can go RIGHT
        				else if (grid[X+1][Y] === 0) {
          					this.xVel = 5;
          					this.yVel = 0;
				        }
			      }

      			//If the AI is going RIGHT and hits collision ...
      			else if (this.xVel === 5) {
        				//...50% chance it will go UP if viable
        				if (grid[X][Y-1] === 0 && direction > 0.5) {
          					this.xVel = 0;
          					this.yVel = -5;
				        }

        				//Check if it can go DOWN
        				else if (grid[X][Y+1] === 0) {
          					this.xVel = 0;
          					this.yVel = 5;
				        }

        				//Check if it can go UP
        				else if (grid[X][Y-1] === 0) {
          					this.xVel = 0;
          					this.yVel = -5;
				        }
			      }

      			//If the AI is going UP and hits collision ...
      			else if (this.yVel === -5) {
        				//50% chance it will go LEFT if viable
        				if (grid[X-1][Y] === 0 && direction > 0.5) {
          					this.xVel = -5;
          					this.yVel = 0;
				        }

        				//Check if it can go RIGHT
        				else if (grid[X+1][Y] === 0) {
          					this.xVel = 5;
          					this.yVel = 0;
				        }

        				//Check if it can go LEFT
        				else if (grid[X-1][Y] === 0) {
          					this.xVel = -5;
          					this.yVel = 0;
				        }
			      }
		    }
	  }
}
