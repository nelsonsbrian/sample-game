function Bird(x, isNPC) {
  this.y = height/2;
  this.x = x;
  this.leftRight = 0;
  this.gravity = 0.50;
  this.upDown = 0;
  this.radius = 32;
  this.armRadius = this.radius/1.5;
  this.hitBox = (this.radius + 15 + 25) / 2;
  this.maxSpeed = 6;
  this.maxSpeedAI = 10;
  this.isNPC = isNPC;
  this.damaged = 0;

  this.show = function() {
    if (this.damaged > 0) {
      fill(255,0,0);
      this.damaged--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }
    ellipse(this.x, this.y, this.radius, this.radius + 15);
    ellipse(this.x, this.y+25, this.armRadius, this.armRadius);
    ellipse(this.x, this.y-25, this.armRadius, this.armRadius);
  }

  this.isHit = function() {
    this.x += 30;
    this.y += random(-10, 10);
    this.damaged = 5;
  }

  this.compAI = function() {
    if (this.isNPC === true) {
      this.moveAI();
    }
  }

  this.moveAI = function() {
    if (this.x > width - (.2 * width)) {
      this.leftRight += .01;
    } else {
      this.leftRight = 0;
    }
    if (this.y < .2 * height) {
      this.upDown += .01;
    } else {
      this.upDown = 0;
    }
    if (this.y > height - (.2 * height)) {
      this.upDown += -.01;
    } else {
      this.upDown = 0;
    }
    this.upDown = constrain(this.upDown, -this.maxSpeedAI, this.maxSpeedAI);
    this.leftRight = constrain(this.leftRight, -this.maxSpeedAI, this.maxSpeedAI);
  }

  this.moveUpDown = function(amount) {
    if (this.upDown > 0 && amount < 0) {
      this.upDown = 0;
    } else if (this.upDown < 0 && amount > 0) {
        this.upDown = 0;
    } else {
      this.upDown += amount;
    }
    this.upDown = constrain(this.upDown, -this.maxSpeed, this.maxSpeed);
  }

  this.moveLeftRight = function(amount) {
    if (this.leftRight > 0 && amount < 0) {
      this.leftRight = 0;
    } else if (this.leftRight < 0 && amount > 0) {
        this.leftRight = 0;
    } else {
      this.leftRight += amount;
    }
    this.leftRight = constrain(this.leftRight, -this.maxSpeed, this.maxSpeed);
  }

  this.update = function() {
    if (this.x >= width-this.radius/2) {
      this.x = width-this.radius/2-1;
      this.leftRight = constrain(this.leftRight, 0, this.maxSpeed)
    } else if (this.x <= this.radius/2) {
      this.x = this.radius/2+1;
      this.leftRight = 0;
      this.leftRight = constrain(this.leftRight, -this.maxSpeed, 0)
    }
    this.x -= this.leftRight * this.gravity;
    this.y += this.upDown * this.gravity;
    if (this.y > height - this.radius/2) {
      this.y = height - this.radius/2;
      this.upDown = 0;
    }
    if (this.y < this.radius/2) {
      this.y = this.radius/2;
      this.upDown = 0;
    }

  }

}
