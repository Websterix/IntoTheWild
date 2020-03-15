var Camera = require("MainCamera");
var Score = require("Score");
var Player = require("Player");

cc.Class({
    extends: cc.Component,
    properties: {
        camera: {
            default: null, type: Camera
        },
        player: { default: null, type: Player },
        score: { default: null, type: Score },
        label: { default: null, type: cc.Label },
        level: { default: 1, visible: false },
        isFadeInOut: { default: false, visible: false },
        isFading: { default: false, visible: false },
        isMaxLevelShown: { default: false, visible: false },
    },

    onLoad: function () {
        this.node.opacity = 0;
        this.node.scale = 2.5;
    },

    update: function (dt) {
        if (this.camera.isOnMenu) {
            this.level = 1;
            this.node.opacity = 0;
            this.isFading = false;
            this.isFadeInOut = false;
            this.label.string = "Level Up";
            this.isMaxLevelShown = false;
            return;
        }

        if (this.isMaxLevelShown) {
            return;
        }

        if (this.score.value > this.level * 10) {
            this.isFadeInOut = true;
            this.level += 1;
            if (this.camera.threatSpawnFrequency > 2000) {
                this.camera.threatSpawnFrequency -= 2000;
            }

            if (this.player.maxMoveSpeed < 12) {
                this.player.maxMoveSpeed += 0.5;
            }

            if (this.player.maxMoveSpeed >= 12 && this.camera.threatSpawnFrequency <= 2000) {
                this.label.string = "Level Max";
            }
        }

        if (this.isFadeInOut && !this.isFading) {
            this.node.opacity += 5;
            this.node.scale += 0.01;
            if (this.node.opacity == 255) {
                this.isFading = true;
            }
        }
        if (this.isFadeInOut && this.isFading) {
            this.node.opacity -= 5;
            this.node.scale -= 0.01;
            if (this.node.opacity == 0) {
                this.isFading = false;
                this.isFadeInOut = false;
                if (this.label.string == "Level Max") {
                    this.isMaxLevelShown = true;
                }
            }
        }
    }
});
