var Camera = require("MainCamera");
var Player = require("Player");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: { default: null, type: Game },
        player: { default: null, type: Player },
        camera: { default: null, type: Camera },
        desiredParallax: 0
    },

    update: function (dt) {
        if (this.game.isPaused) { return; }
        if ((this.node.x - this.player.node.x) < this.camera.removalThreshold) {
            this.node.x = (this.player.node.x + this.camera.minSpawnX) + (Math.random() * 3000);
        }

        this.node.x = this.node.x + this.player.xSpeed - (this.desiredParallax * this.player.xSpeed);
    }
});
