// Physik GFS von Jonas


// engine variable
var engine;

// list of all atoms
var hydros = [];

// List of elements and their color in the fusion chain
let elements;

// Input variables
let slider;
let button, plus, minus;

function setup() {

  createCanvas(windowWidth, windowHeight);


  elements = [
    [color(255, 255, 0), "H"],
    [color(0, 255, 0), "He"],
    [color(0), "C"],
    [color(200, 100, 0), "Ne"],
    [color(255, 0, 0), "O"],
    [color(120), "Si"],
    [color(200), "Fe"]
  ];

  // Input Declarations
  button = createButton('Neue Partikel');
  button.position(0, 0);
  button.size(width, 50);
  button.mousePressed(addParticles);

  plus = createButton('Heißer');
  plus.position(0, 50);
  plus.size(width/2, 50);
  plus.mousePressed(faster);

  minus = createButton('Kälter');
  minus.position(width/2, 50);
  minus.size(width/2, 50);
  minus.mousePressed(slower);

  // start the Engine
  engine = Matter.Engine.create();
  engine.world.gravity.y = 0;

  // make the borders of the screen fitting the window
  Borders();

  // Event callback for collision detection
  Matter.Events.on(engine, 'collisionStart', function(event) {
      // return pair of colliding objects
      var pairs = event.pairs.slice()[0];
      let a = pairs.bodyA;
      let b = pairs.bodyB;

      // check if atoms are the same
      if (a.label == b.label) {

        // velocity has to be higher than the threshold to fuse
        if ((vel(a) + vel(b)) > (int(a.label) * 10)) {

          // check if not on the end of the chain
          if (int(a.label) < elements.length - 1) {

            // bodyB is now the new fused element
            b.label = str(int(b.label) + 1);

            // remove the other redundand one
            var found = hydros.indexOf(hydros.find(x => x.body === a));
            hydros[found].remove();
            hydros.splice(found, 1);
          }
        }
      }
  });

  // run the engine
  Matter.Engine.run(engine);
}


function draw() {
  background(51);

  for(var i = 0; i < hydros.length; i++) {
    hydros[i].show();
  }
}


// Callback for adding new Particles
function addParticles() {
  for (var i = 0; i < 100; i++) {
    hydros.push(new Hydrogen(random(0, width), random(0, height), 10));
  }
}


// return value of velocity
function vel(body) {
  return sqrt(body.velocity.x * body.velocity.x + body.velocity.y * body.velocity.y)
}


// accelerate the atoms
function faster() {
  for(var i = 0; i < hydros.length; i++) {
    let vx = hydros[i].body.velocity.x *= 1.5;
    let vy = hydros[i].body.velocity.y *= 1.5;

    Matter.Body.setVelocity(hydros[i].body, {x: vx, y: vy});
  }
}


// decelerate the atoms
function slower() {
  for(var i = 0; i < hydros.length; i++) {
    let vx = hydros[i].body.velocity.x *= 2/3;
    let vy = hydros[i].body.velocity.y *= 2/3;

    Matter.Body.setVelocity(hydros[i].body, {x: vx, y: vy});
  }
}
