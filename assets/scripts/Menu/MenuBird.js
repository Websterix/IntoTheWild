var Camera = require("MainCamera");

cc.Class({
    extends: cc.Component,
    
    properties: {
        moveSpeed: 0,
        camera: {
            default: null,
            type: Camera
        }
    },

    update: function(dt) {
        if (this.camera.isOnMenu){
            this.node.x -= this.moveSpeed;
            if(this.node.x < this.camera.removalThreshold){
                this.node.x = 1300 + (Math.random() * 500);
                //this.node.y =  1000 + (Math.random() * 450);
                this.node.y =  Math.random() * 450;
            }
        }
    }
});
