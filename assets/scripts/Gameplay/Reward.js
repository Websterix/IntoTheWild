var GameNode = require("Game");
var Player = require("Player");
var Camera = require("MainCamera");
var Jump = require("Jump");

cc.Class({
    extends: cc.Component,

    properties: {
        desiredMagnetEasing: 0,
        desiredFoodEasing: 0,
        pickRadius: 0,
        foodValue: 0,
        camera: { default: null, type: Camera },
        gameNode: { default: null, type: GameNode },
        totalFoodLabel: { default: null, type: cc.Label },
        foodBasket:{default: null, visible: false},
        player: { default: null, type: Player },
        jumping: { default: null, type: Jump },
        isDragging: { default: false, visible: false },
        foodEasing: { default: 0, visible: false },
        magnetEasing: { default: 0, visible: false },
        rewardEffect: { default: null, type: cc.AudioClip },        
    },

    onLoad: function () {
        this.foodEasing = this.desiredFoodEasing;
        this.magnetEasing = this.desiredMagnetEasing;
        this.foodBasket = cc.find("Game/Gameplay/GameHud/FoodBasket");
    },

    dragFoodToBasket: function () {
        var difY = this.foodBasket.y - this.node.y;
        var difX = this.foodBasket.x - this.node.x;
        // Carrying food to basket
        if (difY > 30 || difX > 30) {
            this.node.x += difX / this.foodEasing;
            this.node.y += difY / this.foodEasing;
            if (this.foodEasing > 1) {
                this.foodEasing -= 1
            }
        }

        // Food carried to basket
        else {
            this.isDragging = false;
            this.foodEasing = this.desiredFoodEasing;

            var foodScore = Number(this.totalFoodLabel.string.replace(": ", ""));
            foodScore += this.foodValue;
            this.totalFoodLabel.string = ": " + foodScore;

            var random = Math.random() * this.camera.foodSpawnFrequency;
            this.node.x = this.player.node.x + random + this.camera.minSpawnX;
            this.node.y = (Math.random() * this.jumping.jumpHeight) - 330;
        }
    },

    dragFoodToPlayer: function () {
        var difY = this.node.y - this.player.node.y;
        var difX = this.node.x - this.player.node.x;

        if (difX < -30 || difX > 30) {
            if (difX < 300) {
                this.node.x -= difX / this.magnetEasing;

                if (difY < -30 || difY > 30) {
                    this.node.y -= difY / this.magnetEasing;
                }

                if (this.magnetEasing > 3) {
                    this.magnetEasing -= 1;
                }
            }
        }
    },

    update(dt) {
        if (this.isDragging) {
            this.dragFoodToBasket();
        }
        else if (this.player.isMagnet) {
            this.dragFoodToPlayer();
        }

        // Player catched the reward
        if (this.node.position.sub(this.player.node.getPosition()).mag() < this.pickRadius && !this.isDragging) {
            cc.audioEngine.playEffect(this.rewardEffect);
            this.magnetEasing = this.desiredMagnetEasing;
            this.isDragging = true;
        }

        // Player did not catched the reward
        else if (this.node.x - this.player.node.x < this.camera.removalThreshold) {
            this.node.x = this.player.node.x + (Math.random() * this.camera.foodSpawnFrequency) + this.camera.minSpawnX;
            this.node.y = (Math.random() * 300) -300;
        }
    },
});
