function Laser(x, y, offset) {
  this.w = 15;
  this.l = 30;
  this.x = x;
  this.y = y - 15 / 2;
  this.offset = (offset / 2) + 2;
  this.speed = 3;
  this.toDel = false;

  this.show = function() {
    fill(0,255,255);
    this.x += this.speed;
    rect(this.x + this.offset , this.y, this.l, this.w, 5);
  }

  this.shoot = function() {
    this.x += this.speed;
  }

  this.edges = function() {
    return (this.x > width);
    }

  this.collides = function(x, y, hitBox) {
    if (x - 32 > this.x && x - 32 < this.x + this.l && y + hitBox > this.y && y - hitBox < this.y + this.w) {
      console.log("hit");
      this.toDel = true;
      return true;
    }

  }
 //
}
