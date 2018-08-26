var birds = [];
var pipes = [];
var lasers = [];
var laser;
var bird;

function setup() {
  createCanvas(640, 480);
  gameReset();
}

function gameReset() {
  birds = [];
  pipes = [];
  lasers = [];
  var laser;
  var bird;  
  bird = new Bird(65, false, "Human");
  birds.push(bird);
  bird = new Bird(575, true, "Computer");
  birds.push(bird);
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  // console.log(lasers.length);

  for (var i = birds.length-1; i >= 0; i--) {
    if (i === 0) {
      if (birds[0] !== 'undefined') {
        $('.p1Health').text(birds[0].health);
      }
    } else if (i === 1) {
      if (birds[1] !== 'undefined') {
        $('.p2Health').text(birds[1].health);
      }
    }
    birds[i].compAI();
    birds[i].update();
    birds[i].show();
    if (birds[i].isDead()) {
      birds.splice(i,1);
    }
  };


  for (var i = lasers.length-1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].shoot();

    for (var j = birds.length-1; j >= 0; j--) {
      if (lasers[i].collides(birds[j].x, birds[j].y, birds[j].hitBox)) {

        birds[j].isHit();
      }
    }
    if (lasers[i].edges() || lasers[i].toDel === true) {
      lasers.splice(i,1);
    }
  }

}

function keyPressed() {
  if (key === ' ') {
    var laser = new Laser(birds[0].x, birds[0].y, birds[0].radius);
    lasers.push(laser);
    laser.shoot();
  }
  if (keyCode === LEFT_ARROW) {
    birds[0].moveLeftRight(3);
  }
  if (keyCode === RIGHT_ARROW) {
    birds[0].moveLeftRight(-3);
  }
  if (keyCode === UP_ARROW) {
    birds[0].moveUpDown(-3);
  }
  if (keyCode === DOWN_ARROW) {
    birds[0].moveUpDown(3);
  }
}























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
