var ROW_Y = [60, 140, 220, 300, 380];
//Coordinates for our enemy bugs to spawn


var NPC_Y = -35; //Coordinates for NPC y-axis
var START = { //Player starting position info for each level
    
        x: 303,
        y: 297,
        row: 3,
        col: 3
    
    
};




var enemyMax = 3; //Maximum number of enemies allowed for the level
var win = false; //Whether level has been won; used to trigger animations.







var Player = function (){};
var player = new Player;
var play = false;
//Array of URLs for player

var chars = [ 
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png'
    
];



// Selector Frame 
var Selector = function() {
    this.col = 0;
    this.x = this.col * 101 + 101;
    this.y = 208;
    this.sprite = 'images/Selector.png';
    this.alpha = 1;
   // this.throbdir = 'down';
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Selector render function
Selector.prototype.render = function() {
    ctx.save();
   // this.throb();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
};

//Selector.render();
var selector;

// Helper for Selector.render that uses alpha transparency to "throb" the selector
//Selector.prototype.throb = function() {
//    if (this.alpha > 0.5 && this.throbdir === 'down') {
//        this.alpha -= 0.0075;
//    }
//    
//    else {
//        this.throbdir = 'up';
//        this.alpha += 0.0075;
//        if (this.alpha > 1 && this.throbdir === 'up') {
//            this.throbdir = 'down';
//        }
//    }
//};

Selector.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col > 0 ? (this.col--, this.x = this.col * 101 + 101) : this.col;
            break;
        case 'right':
            this.col < 2 ? (th020is.col++, this.x = this.col * 101 + 101) : this.col;
            break;
        case 'enter':
            selectedChar = this.col;
            play = true;
            console.log("true");
            //Enemy.update();
            gameReset();
            break;
        default:
            break;
    }
};


function initLoad() {
    selector = new Selector;
}


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = ROW_Y[y];
    this.row = y + 1;
    this.speed = speed;
    this.x = x;
    
    
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    //If they are on screen, they move their speed
    if (this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
  }
   else {
        this.speed = 50 + Math.floor(Math.random() * 100);
//	var level = 1;
     this.x = randomize(-100, -300);
	this.row = randomize(0, 2);
 // this.row = (level === 2) ? randomize(0,3) : randomize(0,2);
        this.y = ROW_Y[this.row];
        this.row++;
  }
};

function randomize(from, to) {
    var num = Math.floor(Math.random() * (to - from + 1) + from);
    return num;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get('images/enemy-bug.png'), this.x, this.y);
	console.log(this.x);
   
};

//
//// Return this enemy's left value for collision detection
//Enemy.prototype.left = function() {
//    var left = this.x;
//    return left;
//}

//// Return this enemy's right value for collision detection
//Enemy.prototype.right = function() {
//    var right = this.x + 100;
//    return right;
//}

Player.prototype.update = function () {};
Player.prototype.render = function () {};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Renders a portion of the player sprite to simulate being in the water
Player.prototype.halfRender = function() {
    var sprite = Resources.get(this.sprite);
    var face = level === 1 ? 50 : 80; // The render position varies by level
    switch (level) {
        //This switch provides the render method based on level
        case 1:
            if(!win && this.row === 0) {
                ctx.drawImage(Resources.get(this.sprite), 0, face, sprite.width, 60, this.x, this.y + face, sprite.width, 60);
            }
            break;
        case 2:
            if (!win && this.row > 0 && this.row < 5) {
                ctx.drawImage(Resources.get(this.sprite), 0, 50, sprite.width, 60, this.x, this.y + face, 101, 60);
            }
            break;
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Takes in user input and converts to directions for player
Player.prototype.handleInput = function(dir) {
   // if (win === true && level === 1) {
        //level++;
        gameReset();
  //  }
//   // if (win === true && level === 2) {
//        play = false;
//        initLoad();
//        level--;
//        gameReset();
//    }
//    else {
        this.dir = dir;
//    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player;
var selector;
var allEnemies = [];

function gameReset() {
    allEnemies = [];
    //npc = [];
   // START.lvl2.col = [3, 2, 4, 1, 5];
  //  START.lvl2.x = START.lvl2.col[0] * 101;
  // enemyMax = (level === 2) ? 8 : 5;
	enemyMax = 3;
    for (i=0; i < enemyMax; i++) {
        var x = 0;
        var y = randomize(0, 2);
//        var y = (level === 2) ? randomize(0,2) : randomize(0,2);
        var speed = 50 + randomize(0, 200);
        allEnemies.push(new Enemy(x, y, speed));
		console.log("push");
    }
//    player = new Player;
//    player.sprite = chars[selectedChar];
//	friends = chars.slice(0);
//	friends.splice(friends.indexOf(player.sprite),1);
	//npcGenerate(1);
//    win = false;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (play === false) {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
    else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
