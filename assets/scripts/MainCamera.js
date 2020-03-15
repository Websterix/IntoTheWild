cc.Class({
    extends: cc.Component,
    
    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        isOnMenu: {
            default: true,
            visible: false
        },    
        removalThreshold: {
            default: -1500,
            visible: false
        },
        minSpawnX: {
            default: 5000,
            visible: false
        },
        foodSpawnFrequency: {
            default: 25000,
            visible: false
        },
        threatSpawnFrequency: {
            default: 10000,
            visible: false
        },
        powerUpSpawnFrequency: {
            default: 3000,
            visible: false
        },
    },

    update: function (dt) {
        if (this.isOnMenu){
            cc.find("Game").getComponent('Game').isPaused = true;
            this.node.y = 1700;
            this.node.x = 0;
        } 
        else{
            this.node.y = 0;
            this.node.x = this.player.x + 350;
        }
    }
});