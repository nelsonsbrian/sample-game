function Mob(x, isNPC, name) {
  this.health = 100;
  this.playerName = name;
  this.y = height/2;
  this.x = x;
  this.leftRight = 0;
  this.gravity = 0.50;
  this.upDown = 0;
  this.diameter = 32;
  this.armDiameter = this.diameter/1.5;
  this.hitBoxY = ((this.diameter + 15 + 25) / 2) - 3;
  this.hitBoxX = (this.diameter / 2) - 3;
  this.maxSpeed = 6;
  this.maxSpeedAI = 10;
  this.isNPC = isNPC;
  this.damaged = 0;

  this.show = function() {
    if (this.damagedColor > 0) {
      fill(255,0,0);
      this.damagedColor--;
    } else if (this.isNPC === true) {
      fill(51,153,255);
    } else {
      fill(255,128,0);
    }
    ellipse(this.x, this.y, this.diameter, this.diameter + 15);
    ellipse(this.x, this.y+25, this.armDiameter, this.armDiameter);
    ellipse(this.x, this.y-25, this.armDiameter, this.armDiameter);
  }

  this.isHit = function(damage) {
    this.x += 30;
    this.y += random(-10, 10);
    this.damagedColor = 5;
    this.health -= damage;
    this.health = constrain(this.health, 0, 120);
  }

  this.isDead = function() {
    if (this.health <= 0) {
      this.death();
    }
    return (this.health <= 0);
  }

  this.death = function() {
    console.log(this.playerName + " is dead!");
    $('#output').text(this.playerName + " is dead!");

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
    for (i=1;i<mobs.length;i+=10) {//mob collides with another mob
      if (mobs[i].playerName !== this.playerName) {

          // N plane intersect
          if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
          ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
              console.log("north plane - no north");
              if (this.upDown < 0) {
              this.upDown = 0;
            }
          }
          // S plane intersect
          if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
          ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
              console.log("south plane - no south");
              if (this.upDown > 0) {
              this.upDown = 0;
            }
          }
          // W plane intersect
          if (((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
          ((this.x - this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x - this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
              console.log("west plane - no west");
              if (this.leftRight > 0) {
              this.leftRight = 0;
            }
          }
          // E plane intersect
          if (((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y - this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY)) ||
          ((this.x + this.hitBoxX <= mobs[i].x + mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY <= mobs[i].y + mobs[i].hitBoxY) &&
          (this.x + this.hitBoxX >= mobs[i].x - mobs[i].hitBoxX) &&
          (this.y + this.hitBoxY >= mobs[i].y - mobs[i].hitBoxY))) {
              console.log("east plane - no east");
              if (this.leftRight < 0) {
              this.leftRight = 0;
            }
          }
        }
      }
          // // NE plane intersect
          // if ((this.x + this.hitBoxX < mobs[i].x + mobs[i].hitBoxX) &&
          // (this.y - this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) &&
          // (this.x + this.hitBoxX > mobs[i].x - mobs[i].hitBoxX) &&
          // (this.y - this.hitBoxY > mobs[i].y - mobs[i].hitBoxY)) {
          // }
          // // SW plane intersect
          // if ((this.x - this.hitBoxX < mobs[i].x + mobs[i].hitBoxX) &&
          // (this.y + this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) &&
          // (this.x - this.hitBoxX > mobs[i].x - mobs[i].hitBoxX) &&
          // (this.y + this.hitBoxY > mobs[i].y - mobs[i].hitBoxY)) {
          // }
          // // SE plane instersect
          // if ((this.x + this.hitBoxX < mobs[i].x + mobs[i].hitBoxX) &&
          // (this.y + this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) &&
          // (this.x + this.hitBoxX > mobs[i].x - mobs[i].hitBoxX) &&
          // (this.y + this.hitBoxY > mobs[i].y - mobs[i].hitBoxY)) {
          // }


          // (this.x + this.hitBoxX - this.HitBoxY < mobs[i].x + mobs[i].hitBoxY ||
          // this.y + this.hitboxX - this.HitBoxY > mobs[i].y - mobs[i].hitBoxX) &&
          //
          // (this.x - this.hitBoxX + this.hitBoxY > mobs[i].x - mobs[i].hitBoxY ||
          // this.y - this.hitBoxX + this.hitBoxY < mobs[i].y + mobs[i].hitBoxX) &&
          //
          // (this.x + this.hitBoxX + this.hitBoxY > mobs[i].x - mobs[i].hitBoxY ||
          // this.y + this.hitBoxX + this.hitBoxY > mobs[i].y - mobs[i].hitBoxX)
          // ) {
          //
          //   console.log("intersect");
          // } else {
            // console.log("no");
        //   }
        // }


        //     mobs[i].x - mobs[i].hitBoxX &&
        //     this.x + this.hitBoxX < mobs[i].x + mobs[i].hitBoxX &&
        //     this.x + this.hitBoxX > mobs[i].x - mobs[i].hitBoxY &&
        //     this.x + this.hitBoxX < mobs[i].x + mobs[i].hitBoxY) {
        //     this.leftRight = 0;
        //   }
        //   if (this.leftRight > 0 &&
        //     this.x - this.hitBoxX > mobs[i].x - mobs[i].hitBoxX &&
        //     this.x - this.hitBoxX < mobs[i].x + mobs[i].hitBoxX &&
        //     this.x - this.hitBoxX > mobs[i].x - mobs[i].hitBoxY &&
        //     this.x - this.hitBoxX < mobs[i].x + mobs[i].hitBoxY) {
        //     this.leftRight = 0;
        //   }
        //   if (this.upDown < 0 &&
        //     this.y + this.hitBoxY > mobs[i].y - mobs[i].hitBoxX &&
        //     this.y + this.hitBoxY < mobs[i].y + mobs[i].hitBoxX &&
        //     this.y + this.hitBoxY > mobs[i].y - mobs[i].hitBoxY &&
        //     this.y + this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) {
        //     this.upDown = 0;
        //   }
        //   if (this.upDown < 0 &&
        //     this.y - this.hitBoxY > mobs[i].y - mobs[i].hitBoxX &&
        //     this.y - this.hitBoxY < mobs[i].y + mobs[i].hitBoxX &&
        //     this.y - this.hitBoxY > mobs[i].y - mobs[i].hitBoxY &&
        //     this.y - this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) {
        //     this.upDown = 0;
        //   }
        // }
    //   }
    // }
    //
    // if (this.x + this.hitBoxX > mobs[i].x - mobs[i].hitBoxX &&
    // this.x - this.hitBoxX < mobs[i].x + mobs[i].hitBoxX &&
    // this.y + this.hitBoxY > mobs[i].y - mobs[i].hitBoxY &&
    // this.y - this.hitBoxY < mobs[i].y + mobs[i].hitBoxY) {


    //mob tries to go offscreen
    if (this.x >= width-this.diameter/2) {
      this.x = width-this.diameter/2-1;
      this.leftRight = constrain(this.leftRight, 0, this.maxSpeed)
    } else if (this.x <= this.diameter/2) {
      this.x = this.diameter/2+1;
      this.leftRight = 0;
      this.leftRight = constrain(this.leftRight, -this.maxSpeed, 0)
    }
    if (this.y > height - this.diameter/2) {
      this.y = height - this.diameter/2;
      this.upDown = 0;
    }
    if (this.y < this.diameter/2) {
      this.y = this.diameter/2;
      this.upDown = 0;
    }
    //add up resulting movemnts and update drawing
    this.x -= this.leftRight * this.gravity;
    this.y += this.upDown * this.gravity;
  }

}
