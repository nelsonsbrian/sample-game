//Main Gameboard sketch
var mobs = [];
var pipes = [];
var lasers = [];
var laser;
var mob;

// this function is called when the page loads and is the canvas setup
function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent('gameBoard');
  gameReset();
}

// this is called at the beginning of the game and when the reset game button is pressed
function gameReset() {
  mobs = [];
  pipes = [];
  lasers = [];
  mob = new Mob(65, false, "Human");
  mobs.push(mob);
  mob = new Mob(575, true, "Computer");
  mobs.push(mob);

}

//this function is called every frame, 30times a sec. Put things that need to be constantly updated in the draw() function
function draw() {
  background(0);


  //update mob drawings
  for (var i = mobs.length-1; i >= 0; i--) {
    if (frameCount % 90 == 0) {//global cooldown counter
      if (mobs[i].gcd > 0) {
        mobs[i].gcd -= 1;
      }
    }
    if (i === 0) {
      if (mobs[0] !== 'undefined') {//update the player health bars above canvas
        $('.p1Health').text(mobs[0].health);
      }
    } else if (i === 1) {
      if (mobs[1] !== 'undefined') {//update the player health bars above canvas
        $('.p2Health').text(mobs[1].health);
      }
    }
    mobs[i].compAI();
    mobs[i].update();
    mobs[i].show();
    if (mobs[i].isDead()) {//if mob.health is = 0, remove mob
      mobs.splice(i,1);
    }
  };

  //update laser drawings
  for (var i = lasers.length-1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].shoot();

    for (var j = mobs.length-1; j >= 0; j--) {//check to see if laser hits a mob
      if (lasers[i].collides(mobs[j].x, mobs[j].y, mobs[j].hitBoxX, mobs[j].hitBoxY)) {
        var laserDamage = lasers[i].damage;
        console.log(laserDamage);
        mobs[j].isHit(laserDamage);
      }
    }
    if (lasers[i].edges() || lasers[i].toDel === true) {// check to see if laser is off screen or if the toDel is flagged to be deleted
      lasers.splice(i,1);
    }
  }

}

// keybindings for movement
function keyPressed() {

  if (keyCode === LEFT_ARROW) {
    mobs[0].moveLeftRight(10);
  }
  if (keyCode === RIGHT_ARROW) {
    mobs[0].moveLeftRight(-10);
  }
  if (keyCode === UP_ARROW) {
    mobs[0].moveUpDown(-10);
  }
  if (keyCode === DOWN_ARROW) {
    mobs[0].moveUpDown(10);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    mobs[0].moveLeftRight(0);
  }
  if (keyCode === RIGHT_ARROW) {
    mobs[0].moveLeftRight(0);
  }
  if (keyCode === UP_ARROW) {
    mobs[0].moveUpDown(0);
  }
  if (keyCode === DOWN_ARROW) {
    mobs[0].moveUpDown(0);
  }
}

// keybindings for actionbars
function keyTyped() {
  if (key === ' ') {
  }
  if (key === '1') {
    var count = 0;
    for (i=0;i<lasers.length;i++) {
      if (lasers[i].size === "regular") {
        count++;
      }
    }
    if (count < 5 && mobs[0].gcd === 0) {
      var laser = new Laser(mobs[0].x, mobs[0].y, mobs[0].diameter, "regular");
      mobs[0].globalCD(1);
      lasers.push(laser);
    }
  }
  if (key === '2') {
    var count = 0;
    for (i=0;i<lasers.length;i++) {
      if (lasers[i].size === "mini0" || lasers[i].size === "mini1" || lasers[i].size === "mini2") {
        count++;
      }
    }
    if (count === 0) {
      for (i=0;i<3;i++) {
        var laser = new Laser(mobs[0].x, mobs[0].y, mobs[0].diameter, "mini" + i);
        laser.mini();
        lasers.push(laser);
      }
    }
  }
}



// var t = function( p ) {
//
//   p.setup = function() {
//     p.createCanvas(200,50);
//   }
//
//   p.draw = function() {
//     p.background(255,0,0);
//     var health = mobs[1].health;
//     p.fill(0,255,0);
//     p.rect(0,0,2*health,50);
//   }
//
//
// };
// var myp5 = new p5(t, 'p2');

















// if (frameCount % 20 == 0) {
//   pipes.push(new Pipe());
// }


// for (var i = pipes.length-1; i >= 0; i--) {
//   pipes[i].show();
//   pipes[i].update();
//
//   if (pipes[i].offscreen()) {
//     pipes.splice(i, 1);
//   }
// };
