Food = function(game, x, y) {
    this.game = game;
    this.debug = false;
    this.sprite = this.game.add.sprite(x, y, 'food');
    let coool = ['0xff0000','0x0000ff','0xFF8A8A','0xFF8A8A','0xB32800','0x7F0000']
    const rann = Math.floor(Math.random()*coool.length)
    this.sprite.tint = coool[rann];


    this.game.physics.p2.enable(this.sprite, this.debug);
    this.sprite.body.clearShapes();
    this.sprite.body.addCircle(this.sprite.width * 0.5);
    this.sprite.body.onBeginContact.add(this.onBeginContact, this);

    this.sprite.food = this;

    this.head = null;
    this.constraint = null;
}

Food.prototype = {
    onBeginContact: function(phaserBody, p2Body) {
        if (phaserBody && phaserBody.sprite.name == "head" && this.constraint === null) {
            this.sprite.body.collides([]);
            this.constraint = this.game.physics.p2.createRevoluteConstraint(
                this.sprite.body, [0,0], phaserBody, [0,0]
            );
            this.head = phaserBody.sprite;
            this.head.snake.food.push(this);
        }
    },
    update: function() {
        if (this.head && Math.round(this.head.body.x) == Math.round(this.sprite.body.x) &&
        Math.round(this.head.body.y) == Math.round(this.sprite.body.y)) {
            this.head.snake.incrementSize();
            this.destroy();
        }
    },
    destroy: function() {
        if (this.head) {
            this.game.physics.p2.removeConstraint(this.constraint);
            this.sprite.destroy();
            this.head.snake.food.splice(this.head.snake.food.indexOf(this), 1);
            this.head = null;
        }
    }
};
