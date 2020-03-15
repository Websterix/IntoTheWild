var CharacterSelection = require("CharacterSelection");
var Camera = require("MainCamera");
var Game = require("Game");


cc.Class({
    extends: cc.Component,

    properties: {
        xSpeed: { default: 0, visible: false },
        maxMoveSpeed: 0,
        accelarate: 0,
        game: { default: null, type: Game },
        camera: { default: null, type: Camera },
        characterSelection: { default: null, type: CharacterSelection },
        animations: { default: null, visible: false },
        isMagnet: { default: false, visible: false },
        isInvincible: { default: false, visible: false },
        isDash: { default: false, visible: false },
        isCollided: { default: false, visible: false }
    },

    dashCatched: function () {
        this.isDash = true;
        this.xSpeed = 20;
    },

    magnetCatched: function () {
        this.isMagnet = true;
    },

    invincibleCatched: function () {
        this.isInvincible = true;
    },

    onLoad: function () {
        this.xSpeed = 0;

        this.animations = new Map();
        this.animations.set(1, 'Bearded');
        this.animations.set(2, 'Scarred');
        this.animations.set(3, 'Geek');
        this.animations.set(4, 'Moustached');
        this.animations.set(5, 'NormalBoy');
        this.animations.set(6, 'NormalGirl');
        this.animations.set(7, 'Thief');
        this.animations.set(8, 'RedHaired');
        this.animations.set(9, 'Racoon');
    },

    update: function (dt) {
        if (this.camera.isOnMenu) {
            this.node.getComponent(cc.Animation).play(this.animations.get(this.characterSelection.selection));
            this.xSpeed = 0;
            this.maxMoveSpeed = 8;
            return;
        }

        if (this.game.isPaused) { return; }

        if (this.xSpeed < this.maxMoveSpeed) {
            this.xSpeed += this.accelarate;
        }

        var action = cc.moveBy(0.001, cc.v2(this.xSpeed, 0));
        this.node.runAction(action);
    },
});


