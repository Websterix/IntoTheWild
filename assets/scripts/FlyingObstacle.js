var Game = require("Game");
var Player = require("Player");
var Camera = require("MainCamera");
var LevelUp = require("LevelUp");

cc.Class({
    extends: cc.Component,

    properties: {
        player: { default: null, type: Player },
        camera: { default: null, type: Camera },
        game: { default: null, type: Game },
        levelUp: { default: null, type: LevelUp },
        birdLevel: 1,
        collisionRadius: 0,
        moveSpeed: 0
    },

    isPowerUpActive: function () {
        return (this.player.isDash || this.player.isInvincible);
    },

    update: function (dt) {
        if (this.game.isPaused) { return; }

        if (this.levelUp.level <= this.birdLevel) {
            return;
        }
        if (!this.isPowerUpActive() && this.node.position.sub(this.player.node.getPosition()).mag() < this.collisionRadius) {
            this.game.collided();
        }

        this.node.x -= this.moveSpeed;
        if ((this.node.x - this.player.node.x) < this.camera.removalThreshold) {
            this.node.x = this.player.node.x + this.camera.minSpawnX + (Math.random() * this.camera.threatSpawnFrequency);
            this.node.y = -250 + (Math.random() * 650);
        }
    }
});
