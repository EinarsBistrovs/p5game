class Platform extends Obj{
    constructor(x, y) {
        super();
        this.width = 150;
        this.height = 20;
        this.loc.x = x;
        this.loc.y = y;

        this.colliders = [
            new RectCollider(0, 0, this.width, this.height, "body", this),
        ];
    }

    drawSelf() {
        fill(0);
        rect(this.loc.x, this.loc.y, this.width, this.height);
    }
}