class Collider {
    constructor(xOffset, yOffset, name, parent) {
        this.x = parent.loc.x + xOffset;
        this.y = parent.loc.y + yOffset;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.parent = parent;
        this.name = name;
    }

    moveToObject() {
        this.x = this.parent.loc.x + this.xOffset;
        this.y = this.parent.loc.y + this.yOffset;
    }
}

class RectCollider extends Collider {
    constructor(xOffset, yOffset, width, height, name, parent) {
        super(xOffset, yOffset, name, parent);
        this.width = width;
        this.height = height;
    }

    checkIfInPoint(x, y) {
        return this.x < x && this.x + this.width > x && this.y < y && this.y + this.height > y;
    }

    checkIfCollidesWithObject(object) {
        for(const collider of object.colliders)
            switch(collider.constructor.name) {
                case 'RectCollider':
                    if (collideRectRect(this.x, this.y, this.width, this.height,
                        collider.x, collider.y, collider.width, collider.height)) {
                        return collider;
                    }
                    break;
                case 'CircleCollider':
                    if (collideRectCircle(this.x, this.y, this.width, this.height,
                        collider.x, collider.y, collider.size) ) {
                        return collider;
                    }
                    break;
            }
        return false;
    }

    draw() {
        fill(Engine.colliderColor);
        rect(this.x, this.y, this.width, this.height);
    }

}

class CircleCollider extends Collider {
    constructor(xOffset, yOffset, size, name, parent) {
        super(xOffset, yOffset, name, parent);
        this.size = size;
    }

    checkIfInPoint(x, y, parent) {
        return dist(this.x, this.y, x, y)  < this.size / 2;
    }

    checkIfCollidesWithObject(object) {
        for(const collider of object.colliders)
            switch(collider.constructor.name) {
                case 'RectCollider':
                    if (collideRectCircle(collider.x, collider.y, collider.width, collider.height,
                        this.x, this.y, this.size)  ) {
                        return collider;
                    }
                    break;
                case 'CircleCollider':
                    if (collideCircleCircle(this.x, this.y, this.size, collider.x, collider.y, collider.size)) {
                        return collider;
                    }
                    break;
            }
        return false;
    }
    draw() {
        fill(Engine.colliderColor);
        ellipse(this.x, this.y, this.size);
    }

}