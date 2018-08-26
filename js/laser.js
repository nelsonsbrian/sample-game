function Laser(x, y, offset) {
  this.x = x;
  this.y = y;
  this.offset = (offset / 2) + 2;
  this.l = 9;
  this.w = 9;
  this.speed = 3;
  this.toDel = false;

  this.show = function() {
    fill(0,255,255);
    this.x += this.speed;
    rect(this.x + this.offset , this.y, this.l, this.w);
  }

  this.shoot = function() {
    this.x += this.speed;
  }

  this.edges = function() {
    return (this.x > width);
    }

  this.collides = function(x, y) {
    if (x > this.x && x < this.x + this.l && y > this.y && y < this.y + this.w) {
      console.log("hit");
      this.toDel = true;
      return true;
    }

  }

}
