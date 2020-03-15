cc.Class({
    extends: cc.Component,

    properties: {
        player: { default: null, type: cc.Node },
    },

    update: function (dt) {
        if (this.player == null) {
            return;
        }

        if ((this.node.x - this.player.x) < -10000) {
            this.node.x = this.player.x + 5000;
        }
    }
});
