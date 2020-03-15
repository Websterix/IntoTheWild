var Camera = require("MainCamera");
var Player = require("Player");

cc.Class({
    extends: cc.Component,

    properties: {
        player: { default: null, type: Player },
        camera: { default: null, type: Camera },
        label: { default: null, type: cc.Label },
        value: { default: 0, visibility: false },
    },

    update: function (dt) {
        if (!this.camera.isOnMenu) {
            this.value = Math.round(this.player.node.x / 200);
            this.label.string = "Score: " + this.value;
        }
    }
});
