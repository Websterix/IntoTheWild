var Camera = require("MainCamera");

cc.Class({
    extends: cc.Component,

    properties: {
        camera: { default: null, type: Camera },
        followedOnX: 0,
        followedOnY: 0
    },

    update: function (dt) {
        if (!this.camera.isOnMenu) {
            this.node.x = this.camera.node.x + this.followedOnX;
            this.node.y = this.camera.node.y + this.followedOnY;
        }
    }
});
