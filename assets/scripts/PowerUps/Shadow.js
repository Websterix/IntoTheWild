
var Player = require("Player");
var Game = require("Game");

cc.Class({
    extends: cc.Component,
    properties: {
        game: { default: null, type: Game },
        player: { default: null, type: Player },
        followedSprite: { default: null, type: cc.Node },
        previousFrameX: { default: 0, visible: false },
        previousFrameY: { default: 0, visible: false },
        desiredOpacity: 0
    },

    update: function (dt) {
        if (this.game.isPaused) { return; }
        this.node.opacity = this.player.isDash ? this.desiredOpacity : 0;
        this.node.x = this.previousFrameX;
        this.node.y = this.previousFrameY;
        this.previousFrameX = this.followedSprite.x;
        this.previousFrameY = this.followedSprite.y;
    },
});


