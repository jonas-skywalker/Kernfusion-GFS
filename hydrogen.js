
function Hydrogen(x, y, r) {
  this.options = {
    friction: 0,
    restitution: 1,
    frictionAir: 0,
    frictionStatic: 0,
    inertia: Infinity,
    label: "0"
  }

  this.body = Matter.Bodies.circle(x, y, r, this.options);
  Matter.Body.setVelocity(this.body, {x: random(-10, 10), y: random(-10, 10)})
  Matter.World.add(engine.world, this.body);
  this.r = r;

  this.show = function() {
    var pos = this.body.position;
    push();
    rectMode(CENTER);
    fill(elements[int(this.body.label)][0]);
    translate(pos.x, pos.y);
    ellipse(0, 0, 2 * this.r);
    textSize(10);
    text(elements[int(this.body.label)][1], this.r + 1, this.r)
    pop();
  }

  this.remove = function() {
    Matter.World.remove(engine.world, this.body);
  }
}
