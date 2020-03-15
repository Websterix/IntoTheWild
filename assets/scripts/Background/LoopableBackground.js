var Player = require("Player");

cc.Class({
    extends: cc.Component,

    properties: {
        player: { default: null, type: Player },
        otherBackground: { default: null, type: cc.Node },
    },

    update: function (dt) {
        if (this.node.x - this.player.node.x < 1000 - this.node.width) {
            this.node.x = this.otherBackground.x + this.otherBackground.width;
        }
    }
});
