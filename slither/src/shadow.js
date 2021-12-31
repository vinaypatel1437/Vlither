Shadow = function(game, sections, scale) {
    this.game = game;
    this.sections = sections;
    this.scale = scale;
    this.shadowGroup = this.game.add.group();
    this.shadows = [];
    this.isLightingUp = false;

    this.lightStep = 0;
    this.maxLightStep = 3;

    this.lightUpdateCount = 0;
    this.updateLights = 3;

    this.darkTint = 0xaaaaaa;
    this.lightTintBright = 0xaa3333;
    this.lightTintDim = 0xdd3333;
}

Shadow.prototype = {
    add: function(x, y) {
        var shadow = this.game.add.sprite(x, y, "shadow");
        shadow.scale.setTo(this.scale);
        shadow.anchor.set(0.5);
        this.shadowGroup.add(shadow);
        this.shadows.push(shadow);
    },
    update: function() {
        var lastPos = null;
        for (var i = 0 ; i < this.sections.length ; i++) {
            var shadow = this.shadows[i];
            var pos = {
                x: this.sections[i].body.x,
                y: this.sections[i].body.y
            };

            if (lastPos && pos.x == lastPos.x && pos.y == lastPos.y) {
                shadow.alpha = 0;
                shadow.naturalAlpha = 0;
            }
            else {
                shadow.alpha = 1;
                shadow.naturalAlpha = 1;
            }
            shadow.position.x = pos.x;
            shadow.position.y = pos.y;

            lastPos = pos;
        }

        if (this.isLightingUp) {
            this.lightUpdateCount++;
            if (this.lightUpdateCount >= this.updateLights) {
                this.lightUp();
            }
        }
        else {
            for (var i = 0 ; i < this.shadows.length ; i++) {
                var shadow = this.shadows[i];
                shadow.tint = this.darkTint;
            }
        }
    },
    setScale: function(scale) {
        this.scale = scale;
        for (var i = 0 ; i < this.shadows.length ; i++) {
            this.shadows[i].scale.setTo(scale);
        }
    },
    lightUp: function() {
        this.lightUpdateCount = 0;
        for (var i = 0 ; i < this.shadows.length ; i++) {
            var shadow = this.shadows[i];
            if (shadow.naturalAlpha > 0) {
                if ((i - this.lightStep) % this.maxLightStep === 0 ) {
                    shadow.tint = this.lightTintBright;
                }
                else {
                    shadow.tint = this.lightTintDim;
                }
            }
        }
        this.lightStep++;
        if (this.lightStep == this.maxLightStep) {
            this.lightStep = 0;
        }
    },
    destroy: function() {
        for (var i = this.shadows.length - 1 ; i >= 0 ; i--) {
            this.shadows[i].destroy();
        }
    }
};
