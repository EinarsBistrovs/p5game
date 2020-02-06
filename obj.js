class Obj {

  constructor() {
    this.loc = createVector(0, 0);
    this.size = 50;
    this.speed = 0;
    this.index = Engine.getLastObjectIndex() + 1;
    this.objType = this.constructor.name;
    this.isOutsideArea = this.checkOutside();
    this.colliders = [];
    this.drawOrder = 1;
    this.static = false;
    Engine.objects.push(this);
  }
   
  // for use in step()
  // executes functions every N second by name
  everyNSecond(second, funcName) {
    if (frameCount % (Engine.targetFrameRate * second) == 0) {
      if (this[funcName] && typeof(this[funcName]) === 'function') {
        this[funcName]();
      }else {
         Engine.throwError("noFuction", funcName ,this);
      }
    }
  }
  
  // checkifObjectHasLeft the screen
  checkOutside() {
    if (this.loc.x + this.size/2 < 0 || this.loc.x + this.size/2 > width  ||
      this.loc.y + this.size/2 < 0  || this.loc.y + this.size/2 > height ) {
        this.onOutsideArea();
        if (!this.isOutsideArea) {
          this.onLeaveArea();
        } 
        this.isOutsideArea = true;
    } else if (this.isOutsideArea) {
        this.onEnterArea();
        this.isOutsideArea = false;
    }
  }
  
  checkIfVectorSumIsOutside(vector1, vector2) {
    return vector1.x + vector2.x < 0 ||
      vector1.x + vector2.x > width ||
      vector1.y + vector2.y < 0 ||
      vector1.t+ vector2.t > height;
  }
  
  // get nearest obj to location type is optional
  getNearestObject(type, location) {
    return Engine.getNearestObject(type, location ? location : this.loc, this);
  }
  
  getDistanceToObject(object) {
    return dist(this.loc.x, this.loc.y, object.loc.x, object.loc.y);
  }

  moveOutsideObject(collider, object, direction) {
    while(collider.checkIfCollidesWithObject(object)) {
      switch (direction) {
        case "UP":
          this.loc.y -=1;
          break;
        case "DOWN":
          this.loc.y +=1;
          break;
        case "LEFT":
          this.loc.x -=1;
          break;
        case "RIGHT":
          this.loc.x +=1;p
          break;
        default:
          this.loc.y +=1;
          break;
      }
      collider.moveToObject();
    }
  }

  checkCollisionAtPosition(collider, x, y) {
    let testCollider = collider.valueOf();
    testCollider.x = x;
    testCollider.y = y;
    for(let object of Engine.objects) {
      if (object !== this && testCollider.checkIfCollidesWithObject(object)) {
        return true;
      }
    }

    return false;
  }

  // call on death
  delete() {
    this.onDeath();
    Engine.deleteObject(this);
  }
  
  drawSelf() {
    // drawing this Obj
  }
  
  // list of functions that are used by engine
  create() {
    // create event
  }
  
  step() {
    // step event
  }
  
  draw() {
    // draw event
  }
    
  onClick(collider) {
    // on click event
  }
  
  onKeyPress() {
    // on any key pressed
  }

  onKeyReleased() {
    // on key release
  }

  omKeyIsDown() {
    // on key is down
  }

  onCollision(other, yourCollider, otherCollider) {
    // on collision with any other object
  }
  
  onOutsideArea() {
    // on object leaving the playable area
  }
  
  onLeaveArea() {
    // on object leaving the playable area
  }
  
  onEnterArea() {
    // on object leaving the playable area
  }
  
  onDeath() {
    // on deleting the object
  }



}
