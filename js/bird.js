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
  this.isNPC = isNPC;

  this.show = function() {
    if (this.isNPC === true) {
      fill(255,0,0);
    } else {
      fill(0,255,0);
    }
    ellipse(this.x, this.y, this.radius, this.radius + 15);
    ellipse(this.x, this.y+25, this.armRadius, this.armRadius);
    ellipse(this.x, this.y-25, this.armRadius, this.armRadius);
  }

  this.isHit = function() {
    this.x += 30;
    this.y += random(-10, 10);
  }

  this.compAI = function() {
    if (this.isNPC === true) {
      this.moveAI();
    }
  }

  this.moveAI = function() {
    if (this.x > width - (.2 * width)) {
      this.leftRight = 2;
    } else {
      this.leftRight = 0;
    }
    if (this.y < .2 * height) {
      this.upDown = 2;
    } else {
      this.upDown = 0;
    }
    if (this.y > height - (.2 * height)) {
      this.upDown = -2;
    } else {
      this.upDown = 0;
    }
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
      this.leftRight = 0;
      this.upDown = 0;
    } else if (this.x <= this.radius/2) {
      this.x = this.radius/2+1;
      this.leftRight = 0;
      this.upDown = 0;
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
