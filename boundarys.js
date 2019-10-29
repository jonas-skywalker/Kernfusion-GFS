
function Bound(x, y, w, h) {
  this.options = {
    isStatic: true,
    friction: 0,
    restitution: 1,
    frictionStatic: 0
  }
  
  this.w = w;
  this.h = h;
  this.c = 0;

  this.body = Matter.Bodies.rectangle(x, y, this.w, this.h, this.options);
  Matter.World.add(engine.world, this.body);

  this.show = function() {
    var pos = this.body.position;
    push();
    rectMode(CENTER);
    fill(255);
    translate(pos.x, pos.y);
    rect(0, 0, w, h);
    pop();
  }
}

function Borders() {
  borders = [
    new Bound(width/2, -50, width, 100),
    new Bound(-50, height/2, 100, height),
    new Bound(width + 50, height/2, 100, height),
    new Bound(width/2, height + 50, width, 100)
  ]

  Matter.World.add(engine.world, borders);
}
