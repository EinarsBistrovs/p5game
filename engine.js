class Engine {

    // acts as constructor and starts Engine
    static start(targetFrameRate) {
        EngineErrors.load();
        this.targetFrameRate = targetFrameRate;
        this.objects = [];
        this.active = true;
        this.colliderColor = "red";
        this.drawColliders = false;
        frameRate(targetFrameRate);
    }

    // executed every frame
    static step() {
        if (this.active) {
            this.objects.forEach(function (object) {
                if (!object.static) {
                    object.step();
                    for (const collider of object.colliders) {
                        collider.moveToObject(object);
                    }
                    object.checkOutside();
                }
                Engine.checkCollisions(object);
            });
        }
        Engine.onKeyIsDown();
        Engine.draw();
    }

    static draw() {
        let drawObjs = [];
        for (let i = 0; i < this.objects.length; i++) {
            let min = 0;
            for (let j = 0; j < this.objects.length; j++) {
                if (this.objects[min].drawOrder >= this.objects[j].drawOrder && !drawObjs.includes(j)) {
                    min = j;
                }
            }
            this.objects[min].drawSelf();
            this.objects[min].draw();
            if (Engine.drawColliders) {
                for (const collider of this.objects[min].colliders) {
                    collider.draw();
                }
            }

            drawObjs.push(min);
        }
    }

    static checkCollisions(object) {
        this.objects.forEach(function (obj) {
            if (obj.index !== object.index) {
                for (const collider of object.colliders) {
                    let otherCollider = collider.checkIfCollidesWithObject(obj);
                    if (otherCollider) {
                        object.onCollision(obj, collider, otherCollider);
                    }
                }
            }
        });
    }

    // checks if object has been clicked on
    static onClick() {
        if (this.active) {
            this.objects.forEach(function (object) {
                for (const collider of object.colliders) {
                    if (collider.checkIfInPoint(mouseX, mouseY, object)) {
                        object.onClick(collider);
                    }
                }
            });
        }
    }

    static onKeyPress() {
        if (this.active) {
            this.objects.forEach(function (object) {
                object.onKeyPress();
            });
        }
    }

    static onKeyRelease() {
        if (this.active) {
            this.objects.forEach(function (object) {
                object.onKeyReleased();
            });
        }
    }

    static onKeyIsDown() {
        if (this.active && keyIsPressed) {
            this.objects.forEach(function (object) {
                object.omKeyIsDown();
            });
        }
    }

    // stops execution - does not execute step and draw events for objects
    static stop() {
        this.active = false;
    }

    // Object functions
    static getObjects() {
        return this.objects;
    }

    static getLastObjectIndex() {
        return this.objects.length > 0 ? this.objects[this.objects.length - 1].index : 0;
    }

    // returns nearest viable object if there is any of given type and not excluded
    static getNearestObject(type, location, exclude) {
        let dist = width * height,
            obj = this.objects[0];
        this.objects.forEach(function (object) {
            if ((!type || object.objType == type) && object != exclude &&
                dist > location.dist(object.loc)) {
                dist = location.dist(object.loc);
                obj = object;
            }
        });

        return obj != exclude && (!type || obj.objType == type) ? obj : null;
    }

    static findObjectByIndex(index) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].index == index) {
                this.objects[i].setPosition = i;
                return this.objects[i];
            }
        }
        return null;
    }

    // gets objects position in Engine.objects array
    static getObjectSetPos(object) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].index == object.index) {
                return i;
            }
        }
        return null;

    }

    static deleteObject(object) {
        let pos = this.getObjectSetPos(object);
        if (pos != null) {
            this.objects[pos] = null;
            this.objects.splice(pos, 1);
        }
    }

    // Error handling in objects
    static throwError(key, attr, caller) {
        EngineErrors.thrw(key, attr, caller);
        this.stop();
    }
}

class EngineErrors {

    static load() {
        this.list = {
            noFuction: "Function name '#1' is not a function in caller"
        }
    }

    static thrw(key, attr, caller) {
        console.log(this.list[key].replace("#1", attr), caller);
    }
}