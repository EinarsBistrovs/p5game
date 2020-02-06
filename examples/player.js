class Player extends Obj{
    constructor(x, y) {
        super();
        this.size = 40;
        this.loc.x = x;
        this.loc.y = y;
        this.yv = 0;
        this.xv = 0

        this.colliders = [
            new CircleCollider(0, 0, 40, "body", this)
        ];
    }

    drawSelf() {
        fill(255, 0 , 0);
        circle(this.loc.x, this.loc.y, this.size);
    }

    step() {
        this.yv += 2;
        this.yv = constrain(this.yv, -50, 10);
        this.loc.y += this.yv;
        this.loc.x += this.xv;
    }

    onCollision(other, yourCollider, otherCollider) {
        if (other.objType === "Platform") {
            if (this.yv > 0) {
                this.moveOutsideObject(this.colliders[0], other, "UP");
                this.yv = 0;
            }
        }
    }

    omKeyIsDown() {
        if (keyCode === LEFT_ARROW ) {
            this.xv -= 5
        }
        if (keyCode === RIGHT_ARROW ) {
            this.xv += 5
        }
        this.xv = constrain(this.xv, -15, 15);
    }

    onKeyPress() {
        if (keyCode === UP_ARROW ) {
            this.yv = -30;
        }
    }

    onKeyReleased() {
        if (keyCode === LEFT_ARROW ) {
            this.xv = 0
        }
        if (keyCode === RIGHT_ARROW ) {
            this.xv = 0
        }
    }
}