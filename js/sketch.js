var birds = [];
var pipes = [];
var lasers = [];
var laser;
var bird;

function setup() {
  createCanvas(640, 480);
  bird = new Bird(65, false);
  birds.push(bird);
  bird = new Bird(575, true);
  birds.push(bird);
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  };

  for (var i = birds.length-1; i >= 0; i--) {
    birds[i].update();
    birds[i].show();
  };


  for (var i = lasers.length-1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].shoot();

    for (var j = birds.length-1; j >= 0; j--) {
      if (lasers[i].collides(birds[j].x, birds[j].y)) {
      }
    }
    if (lasers[i].edges() || lasers[i].toDel === true) {
      lasers.splice(i,1);
    }
  }


  // if (frameCount % 20 == 0) {
  //   pipes.push(new Pipe());
  // }
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
