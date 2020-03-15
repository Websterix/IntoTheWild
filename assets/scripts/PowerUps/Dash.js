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
        powerUpEffect: { default: null, type: cc.AudioClip },
        dashTime: { default: 15, visible: false },
        actualDashTime: { default: 0, visible: false },
    },

    onLoad() {
        var dashLevel = cc.sys.localStorage.getItem('dashLevel');
        if (dashLevel != null) { this.dashTime = 15 + (3 * Number(dashLevel)); }
    },

    handleDash: function () {
        if (this.player.isDash) {
            if (this.actualDashTime < this.dashTime * 30) {
                if (this.actualDashTime > this.dashTime * 20 && this.player.xSpeed > this.player.maxMoveSpeed) {
                    this.player.xSpeed -= 0.1;
                }

                this.actualDashTime += 1;
            }

            if (this.actualDashTime == this.dashTime * 30) {
                this.actualDashTime = 0;
                this.player.isDash = false;
                this.player.xSpeed = this.player.maxMoveSpeed;
            }
        }
    },

    update(dt) {
        if (this.game.isPaused) { return; }
        this.handleDash();
        // Player catched the reward
        if (this.node.position.sub(this.player.node.getPosition()).mag() < this.pickRadius) {
            this.node.x = this.player.node.x + this.camera.removalThreshold;
            cc.audioEngine.playEffect(this.powerUpEffect);
            this.player.dashCatched();
        }

        // Player did not catched the reward
        else if (this.node.x - this.player.node.x < this.camera.removalThreshold) {
            this.node.x = this.player.node.x + (Math.random() * this.camera.powerUpSpawnFrequency) + this.camera.minSpawnX;
            this.node.y = (Math.random() * 300) - 300;
        }
    },
});
