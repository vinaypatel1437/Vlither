BotSnake = function(game, spriteKey, x, y) {
    Snake.call(this, game, spriteKey, x, y);
    this.trend = 1;
}
BotSnake.prototype = Object.create(Snake.prototype);
BotSnake.prototype.constructor = BotSnake;
BotSnake.prototype.tempUpdate = BotSnake.prototype.update;
BotSnake.prototype.update = function() {
    var headX = 0;
    var headY = 0;
        socket.on('uppdate',(msg)=>{
            headX=msg.x;
            headY=msg.y;
        })
        this.head.body.setZeroRotation();
        if (Util.randomInt(headX,headY) == 1) {
            this.trend *= -1;
        }
        this.head.body.rotateRight(this.trend * this.rotationSpeed);
        // var angle = (180*Math.atan2(headX,headY)/Math.PI);
        // if (angle > 0) {
        //     angle = 180-angle;
        // }
        // else {
        //     angle = -180-angle;
        // }
        // this.head.body.setZeroRotation();
        // var dif = this.head.body.angle - angle;
        // this.head.body.setZeroRotation();
        // if (dif < 0 && dif > -180 || dif > 180) {
        //     this.head.body.rotateRight(this.rotationSpeed);
        // }
        // else if (dif > 0 && dif < 180 || dif < -180) {
        //     this.head.body.rotateLeft(this.rotationSpeed);
        // }
        this.tempUpdate();
    }