var Game = require("Game");

cc.Class({
    extends: cc.Component,
    properties: {
        game: { default: null, type: Game },
        player: { default: null, type: cc.Node },
        jumpingCanvas: { default: null, type: cc.Node },
        isTouchStart: { default: false, visible: false },
        isTouchEnded: { default: false, visible: false },
        isFalling: { default: false, visible: false },
        desiredJumpingAcc: { default: 550, visible: false },
        jumpingAcc: { default: 550, visible: false },
        desiredflyingTime: { default: 20, visible: false },
        flyingTime: { default: 0, visible: false },
    },

    onLoad: function () {
        this.jumpingCanvas.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.jumpingCanvas.on(cc.Node.EventType.TOUCH_END, this.touchEnded, this);
    },

    touchStart: function () { if (!this.isFalling) { this.isTouchStart = true; this.isTouchEnded = false; } },
    touchEnded: function () { this.isTouchStart = false; this.isTouchEnded = true; this.isFalling = true; },

    update: function () {
        if (this.player.x < 300) { return; }
        if (this.isTouchStart && !this.isFalling && !this.game.isPaused) {
            if (this.player.y < 0) {
                this.player.y += this.jumpingAcc;
                if (this.jumpingAcc > 5) {
                    this.jumpingAcc /= 1.05;
                }
            } else {
                this.isTouchEnded = true;
                this.isTouchStart = false;
            }
        }

        if (this.isTouchEnded) {
            if (this.player.y > -345) {
                if (this.flyingTime < this.desiredflyingTime) {
                    this.flyingTime += 1;
                    return;
                }

                this.player.y -= this.jumpingAcc;
                if (this.jumpingAcc < this.desiredJumpingAcc) {
                    this.jumpingAcc *= 1.05;
                }
            } else {
                this.isTouchEnded = false;
                this.isTouchStart = false;
                this.isFalling = false;
                this.jumpingAcc = this.desiredJumpingAcc;
                this.flyingTime = 0;
            }
        }


        this.jumpingCanvas.x = this.player.x;
    }
});
