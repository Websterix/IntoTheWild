var Player = require("Player");
var Camera = require("MainCamera");
var Jump = require("Jump");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: { default: null, type: Game },
        camera: { default: null, type: Camera },
        player: { default: null, type: Player },
        jumping: { default: null, type: Jump },
        game: { default: null, type: Game },
        shieldSprite: { default: null, type: cc.Node },
        actualInvincibleTime: { default: 0, visible: false },
        powerUpEffect: { default: null, type: cc.AudioClip },
        invincibleTime: { default: 15, visible: false }
    },

    onLoad() {
        var invincibleLevel = cc.sys.localStorage.getItem('invincibleLevel');
        if (invincibleLevel != null) { this.invincibleTime = 15 + (3 * Number(invincibleLevel)); }
    },

    handleInvincibility: function () {
        if (this.player.isInvincible) {
            this.shieldSprite.x = this.player.node.x + 5;
            this.shieldSprite.y = this.player.node.y;
            this.shieldSprite.opacity = 255;
            this.shieldSprite.angle -= 5;

            if (this.actualInvincibleTime < this.invincibleTime * 30) {
                this.actualInvincibleTime += 1;
            }

            if (this.actualInvincibleTime == this.invincibleTime * 30) {
                this.shieldSprite.opacity = 0
                this.actualInvincibleTime = 0;
                this.player.isInvincible = false;
            }
        }
    },

    update(dt) {
        if (this.game.isPaused) { return; }

        this.handleInvincibility();
        // Player catched the reward
        if (this.node.position.sub(this.player.node.getPosition()).mag() < this.pickRadius) {
            this.node.x = this.player.node.x + this.camera.removalThreshold;
            cc.audioEngine.playEffect(this.powerUpEffect);

            this.player.invincibleCatched()
        }

        // Player did not catched the reward
        else if (this.node.x - this.player.node.x < this.camera.removalThreshold) {
            this.node.x = this.player.node.x + (Math.random() * this.camera.powerUpSpawnFrequency) + this.camera.minSpawnX;
            this.node.y = (Math.random() * 300) - 300;
        }
    },
});
