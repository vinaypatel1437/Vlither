Game = function (game) { }
const { namee, skin } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
Game.prototype = {
    preload: function () {
        this.game.load.image('circle', 'asset/circle.png');
        this.game.load.image('circle2', 'asset/circle2.png');
        this.game.load.image('circle3', 'asset/circle3.png');
        this.game.load.image('circle4', 'asset/circle4.png');
        this.game.load.image('heart', 'asset/heart.png')
        this.game.load.image('captain', 'asset/captain.png')
        this.game.load.image('iron', 'asset/iron.png')
        this.game.load.image('spider', 'asset/spider.png')
        this.game.load.image('venom', 'asset/venom.png')
        this.game.load.image('thor', 'asset/thor.png')
        this.game.load.image('hulk', 'asset/hulk.png')
        this.game.load.image('shadow', 'asset/white-shadow.png');
        this.game.load.image('background', 'asset/title.jpg');
        this.game.load.image('eye-white', 'asset/eye-white.png');
        this.game.load.image('eye-black', 'asset/eye-black.png');
        this.game.load.image('food', 'asset/hex.png');
    },
    create: function () {
        var width = this.game.width;
        var height = this.game.height;
        this.game.world.setBounds(-width, -height, width * 2, height * 2);
        this.game.stage.backgroundColor = '#444';
        var background = this.game.add.tileSprite(-width, -height,
            this.game.world.width, this.game.world.height, 'background');
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.foodGroup = this.game.add.group();
        this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();
        for (var i = 0; i < 500; i++) {
            this.initFood(Util.randomInt(-width, width), Util.randomInt(-height, height));
        }
        this.game.snakes = [];
        // snake
        var axis = [10,20,30,40,50,60,70,80,90,100,120,130,140];
        var skkinn = ['venom','thor','hulk','eye-white','eye-black','spider','captain','iron','heart','circle','circle2']
        var xAxis = axis[Math.floor(Math.random()*axis.length)];
        var yAxis = axis[Math.floor(Math.random()*axis.length)];
        var snake = new PlayerSnake(this.game, skin, xAxis, yAxis);
        console.log(snake)
        var points = {
            x: snake.head.x,
            y: snake.head.y,
            skinn: skin,
            height: snake.snakeLength
        }
        let score = snake.snakeLength;
        this.game.camera.follow(snake.head);
        // initialize snake groups and collision
        for (var i = 0; i < this.game.snakes.length; i++) {
            var snake = this.game.snakes[i];
            snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
            snake.head.body.collides([this.foodCollisionGroup]);
            //callback for when a snake is destroyed
            snake.addDestroyedCallback(this.snakeDestroyed, this);
        }
        socket.emit("join", ({ namee, points, score }));
        socket.on("roomUseer", (userr) => {
            xAxis = axis[Math.floor(Math.random()*axis.length)];
            yAxis = axis[Math.floor(Math.random()*axis.length)];
            var sskkiinn = skkinn[Math.floor(Math.random()*skkinn.length)];
            var snake = new BotSnake(this.game,sskkiinn,xAxis,yAxis)
            for(var i = 0; i < this.game.snakes.length; i++) {
                var snake = this.game.snakes[i];
                snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
                snake.head.body.collides([this.foodCollisionGroup]);
                snake.addDestroyedCallback(this.snakeDestroyed, this);
            }
        })
        // var uuser = []
        // snake -> create
        console.log(this.game.snakes)
    },
    update: function () {
        // let usere =[];
        // for(var i=0;i<usere.length;i++){
        //     new Snake(this.game,"captain", 0, 0);
        // }
        for (var i = this.game.snakes.length - 1; i >= 0; i--) {
            this.game.snakes[i].update();
        }
        for (var i = this.foodGroup.children.length - 1; i >= 0; i--) {
            var f = this.foodGroup.children[i];
            f.food.update();
        }
    },
    initFood: function (x, y) {
        var f = new Food(this.game, x, y);
        f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
        this.foodGroup.add(f.sprite);
        f.sprite.body.collides([this.snakeHeadCollisionGroup]);
        return f;
    },
    snakeDestroyed: function (snake) {
        for (var i = 0; i < snake.headPath.length;
            i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
            this.initFood(
                snake.headPath[i].x + Util.randomInt(-10, 10),
                snake.headPath[i].y + Util.randomInt(-10, 10)
            );
        }
    }
};