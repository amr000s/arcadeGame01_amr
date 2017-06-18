// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var allEnemies = [];


var Player = function (){};




var player = new Player;
var play = false;
//Array of URLs for player
var chars = [ 
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];



// Selector Frame 
var Selector = function() {
    this.col = 0;
    this.x = this.col * 101 + 101;
    this.y = 208;
    this.sprite = 'images/Selector.png';
    this.alpha = 1;
    this.throbdir = 'down';
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Selector render function
Selector.prototype.render = function() {
    ctx.save();
    this.throb();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
};


var selector;

// Helper for Selector.render that uses alpha transparency to "throb" the selector
Selector.prototype.throb = function() {
    if (this.alpha > 0.5 && this.throbdir === 'down') {
        this.alpha -= 0.0075;
    }
    
    else {
        this.throbdir = 'up';
        this.alpha += 0.0075;
        if (this.alpha > 1 && this.throbdir === 'up') {
            this.throbdir = 'down';
        }
    }
};

Selector.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col > 0 ? (this.col--, this.x = this.col * 101 + 101) : this.col;
            break;
        case 'right':
            this.col < 4 ? (this.col++, this.x = this.col * 101 + 101) : this.col;
            break;
        case 'enter':
            selectedChar = this.col;
            play = true;
            gameReset();
            break;
        default:
            break;
    }
};

Player.prototype.update = function () {};
player.prototype.render = function () {};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
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
