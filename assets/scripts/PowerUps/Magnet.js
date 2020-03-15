var Player = require("Player");
var Camera = require("MainCamera");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: { default: null, type: Game },
        camera: { default: null, type: Camera },
        player: { default: null, type: Player },
        magnetisationSprite: { default: null, type: cc.Node },
        scaleDirection: { default: true, visible: false },
        magnetTime: { default: 15, visible: false },
        actualMagnetTime: { default: 0, visible: false },
        powerUpEffect: { default: null, type: cc.AudioClip },        
    },

    onLoad() {
        var magnetLevel = cc.sys.localStorage.getItem('magnetLevel');
        if (magnetLevel != null) { this.magnetTime = 15 + (3 * Number(magnetLevel)); }
    },

    handleMagnet: function () {
        if (this.player.isMagnet) {
            this.magnetisationSprite.x = this.player.node.x + 5;
            this.magnetisationSprite.y = this.player.node.y;
            this.magnetisationSprite.opacity = 255;

            this.magnetisationSprite.angle += 1;

            if (this.scaleDirection) {
                this.magnetisationSprite.scale += 0.01;
            } else {
                this.magnetisationSprite.scale -= 0.01;
            }

            if (this.magnetisationSprite.angle % 60 == 0) {
                this.scaleDirection = !this.scaleDirection;
            }

            if (this.actualMagnetTime < this.magnetTime * 30) {
                this.actualMagnetTime += 1;
            }

            if (this.actualMagnetTime >= this.magnetTime * 30) {
                this.magnetisationSprite.opacity = 0;
                this.actualMagnetTime = 0;
                this.player.isMagnet = false
            }
        }
    },


    update(dt) {
        if (this.game.isPaused) { return; }

        this.handleMagnet();
        // Player catched the reward
        if (this.node.position.sub(this.player.node.getPosition()).mag() < this.pickRadius) {
            this.node.x = this.player.node.x + this.camera.removalThreshold;
            cc.audioEngine.playEffect(this.powerUpEffect);
            this.player.magnetCatched()
        }

        // Player did not catched the reward
        else if (this.node.x - this.player.node.x < this.camera.removalThreshold) {
            this.node.x = this.player.node.x + (Math.random() * this.camera.powerUpSpawnFrequency) + this.camera.minSpawnX;
            this.node.y = (Math.random() * 300) -300;
        }
    },
});
