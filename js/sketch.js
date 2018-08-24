var birds = [];
var pipes = [];
var bird;

function setup() {
  createCanvas(640, 480);
  bird = new Bird(575, true);
  birds.push(bird);
  bird = new Bird(65, false);
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



  // if (frameCount % 20 == 0) {
  //   pipes.push(new Pipe());
  // }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    bird.moveLeftRight(3);
  }
  if (keyCode === RIGHT_ARROW) {
    bird.moveLeftRight(-3);
  }
  if (keyCode === UP_ARROW) {
    bird.moveUpDown(-3);
  }
  if (keyCode === DOWN_ARROW) {
    bird.moveUpDown(3);
  }
}
