var Player = require("Player");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: { default: null, type: Game },
        player: { default: null, type: Player },
        desiredParallax: 0
    },

    update: function (dt) {
        if (this.game.isPaused) { return; }
        this.node.x = this.node.x + this.player.xSpeed - (this.desiredParallax * this.player.xSpeed);
    }
});
