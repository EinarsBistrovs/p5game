function setup() {
  Engine.start(30);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  Engine.step();
}

function mousePressed() {
  Engine.onClick();
}

function keyPressed() {
  Engine.onKeyPress();

  if (key == "o") {
    console.log(Engine.getObjects());
  }
  if (key == "a") {
    Engine.active = !Engine.active;
  }
  if (key == "c") {
    Engine.drawColliders = !Engine.drawColliders;
  }
   if (key == " ") {
    new Platform(mouseX, mouseY);
  }
  if (key == "p") {
    new Player(mouseX, mouseY);
  }
}

function keyReleased() {
  Engine.onKeyRelease();
}
