var Camera = require("MainCamera");
var Player = require("Player");
var Sky = require("Sky");

var Dash = require("Dash");
var Invincible = require("Invincible");
var Magnet = require("Magnet");
var SdkBoxPlay = require("SdkBoxPlay");

cc.Class({
    extends: cc.Component,

    properties: {
        sdkBoxPlay: { default: null, type: SdkBoxPlay },
        camera: { default: null, type: Camera },
        player: { default: null, type: Player },
        sky: { default: null, type: Sky },
        menuLayer: { default: null, type: cc.Node },
        howToPlayLayer: { default: null, type: cc.Node },
        shopLayer: { default: null, type: cc.Node },
        dash: { default: null, type: Dash },
        invincible: { default: null, type: Invincible },
        magnet: { default: null, type: Magnet },
    },

    onLoad() {
        if (cc.sys.localStorage.getItem('money') == null) { cc.sys.localStorage.setItem('money', 0); }
        if (cc.sys.localStorage.getItem('dashLevel') == null) { cc.sys.localStorage.setItem('dashLevel', 0); }
        if (cc.sys.localStorage.getItem('invincibleLevel') == null) { cc.sys.localStorage.setItem('invincibleLevel', 0); }
        if (cc.sys.localStorage.getItem('magnetLevel') == null) { cc.sys.localStorage.setItem('magnetLevel', 0); }
    },

    achievementsButtonOnPressed: function () {
        var isLoggedIn = this.sdkBoxPlay.isSignedIn();
        if (isLoggedIn) {
            this.sdkBoxPlay.showLeaderBoard();
        }
        else {
            cc.find("Game/Menu/MenuLayer/AchievementsBoard").runAction(cc.scaleTo(0.5, 1, 1));
        }
    },

    closeBoard: function () {
        cc.find("Game/Menu/MenuLayer/AchievementsBoard").runAction(cc.scaleTo(0.5, 0, 0));
    },

    startGameButtonOnPressed: function () {
        cc.find("Game/Gameplay/GameHud/TotalFoodLabel").getComponent(cc.Label).string = ": " + Number(cc.sys.localStorage.getItem('money'));
        this.dash.dashTime = 15 + (3 * Number(cc.sys.localStorage.getItem('dashLevel')));
        this.invincible.invincibleTime = 15 + (3 * Number(cc.sys.localStorage.getItem('invincibleLevel')));
        this.magnet.magnetTime = 15 + (3 * Number(cc.sys.localStorage.getItem('magnetLevel')));

        var removalThreshold = this.camera.removalThreshold;

        for (var i = 1; i < 11; i++) {
            cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird" + i).x = removalThreshold;
        }

        cc.find("Game/Gameplay/Rewards/Banana").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Grapes").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Cherries").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Lemon").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Apple").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Pear").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Tomato").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Orange").x = removalThreshold;
        cc.find("Game/Gameplay/Rewards/Peach").x = removalThreshold;

        cc.find("Game/Gameplay/PowerUps/Invincibility").x = removalThreshold;
        cc.find("Game/Gameplay/PowerUps/Dash").x = removalThreshold;
        cc.find("Game/Gameplay/PowerUps/Magnet").x = removalThreshold;

        cc.find("Game/Gameplay/Magnetisation").opacity = 0;

        cc.find("Game/Gameplay/Obstacles/Wolf").x = removalThreshold;

        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer1/Mountain1").x = 3000;
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer1/Mountain2").x = 10500;

        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Clouds1").x = 0;
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Clouds2").x = 7500;
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Airplane").x = removalThreshold;

        for (var i = 1; i < 11; i++) {
            cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree" + i).x = removalThreshold;
        }

        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/House").x = 0
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/Bush1").x = 0;
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/Bush2").x = 7000;

        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer5/Ground1").x = 0;
        cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer5/Ground2").x = 5046;

        cc.find("Game/Gameplay/Player").x = 0;
        cc.find("Game/Main Camera").y = 0;
        cc.find("Game/Gameplay/GameHud/Score").x = 0;

        cc.find("Game/Gameplay/BackgroundCanvas/Sky/NightSky").opacity = 0;
        cc.find("Game/Gameplay/BackgroundCanvas/Sky/StarSky").opacity = 0;
        this.sky.resetDay();

        this.sky.node.opacity = 255;

        this.player.isMagnet = false;
        this.sky.fading = false;

        this.camera.isOnMenu = false;

        cc.find("Game").getComponent('Game').isPaused = false;

        cc.find("Game/Menu").opacity = 0;
        cc.find("Game/Gameplay").opacity = 255;
        cc.find("Game/Admob").getComponent('Admob').cacheInterstitial();
        this.camera.threatSpawnFrequency = 10000;
    },

    howToPlayButtonOnPressed: function () {
        var action = cc.moveBy(0.5, cc.v2(2500, 0));
        this.menuLayer.runAction(action);

        var action = cc.moveBy(0.5, cc.v2(2500, 0));
        this.howToPlayLayer.runAction(action);
    },

    shopButtonOnPressed: function () {
        if (cc.sys.localStorage.getItem('money') == null) { cc.sys.localStorage.setItem('money', 0); }
        cc.find("Game/Menu/ShopLayer/FoodValueLabel").getComponent(cc.Label).string = ": " + Number(cc.sys.localStorage.getItem('money'));

        var action = cc.moveBy(0.5, cc.v2(2500, 0));
        this.menuLayer.runAction(action);

        var action = cc.moveBy(0.5, cc.v2(2500, 0));
        this.shopLayer.runAction(action);
    },

    backToMenuFromHowToPlayOnPressed: function () {
        var action = cc.moveBy(0.5, cc.v2(-2500, 0));
        this.howToPlayLayer.runAction(action);

        var action = cc.moveBy(0.5, cc.v2(-2500, 0));
        this.menuLayer.runAction(action);
    },

    backToMenuFromShop: function () {
        var action = cc.moveBy(0.5, cc.v2(-2500, 0));
        this.menuLayer.runAction(action);

        var action = cc.moveBy(0.5, cc.v2(-2500, 0));
        this.shopLayer.runAction(action);
    },
});
