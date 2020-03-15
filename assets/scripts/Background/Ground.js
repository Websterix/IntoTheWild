cc.Class({
    extends: cc.Component,
    
    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        otherGround: {
            default: null,
            type: cc.Node
        },
    },

    update: function(dt) {
        if((this.node.x - this.player.x) < -3500){
            var newX = this.otherGround.x + this.otherGround.width;
            this.node.x = newX
        }
    } 
});
