var Camera = require("MainCamera");
var Money = require("Money");
var Admob = require("Admob");
var SdkBoxPlay = require("SdkBoxPlay");

cc.Class({
    extends: cc.Component,
    properties: {
        sdkBoxPlay: { default: null, type: SdkBoxPlay },
        admob: { default: null, type: Admob },
        camera: { default: null, type: Camera },
        money: { default: null, type: Money },
        totalFoodLabel: { default: null, type: cc.Label },
        scoreLabel: { default: null, type: cc.Label },
        isPaused: { default: true, visible: false },
        pauseBoard: { default: null, visible: false },
        endGameBoard: { default: null, visible: false },
        sliderFront: { default: null, visible: false },
        currentScoreCircle: { default: null, visible: false },
        sliderCurrentScoreLabel: { default: null, visible: false },
        sliderHighestScoreLabel: { default: null, visible: false },
    },

    onLoad: function () {
        cc.sys.localStorage.clear();
        this.pauseBoard = cc.find("Game/Gameplay/Pause/PauseBoard");
        this.endGameBoard = cc.find("Game/Gameplay/EndGame/EndGameBoard");
        this.sliderFront = cc.find("Game/Gameplay/EndGame/EndGameBoard/ScoreSlider/SliderFront");
        this.currentScoreCircle = cc.find("Game/Gameplay/EndGame/EndGameBoard/ScoreSlider/CurrentScoreCircle");
        this.sliderCurrentScoreLabel = cc.find("Game/Gameplay/EndGame/EndGameBoard/ScoreSlider/CurrentScoreCircle/CurrentScoreLabel");
        this.sliderHighestScoreLabel = cc.find("Game/Gameplay/EndGame/EndGameBoard/ScoreSlider/HighScoreCircle/HighestScoreLabel");

        if (cc.sys.localStorage.getItem('isScarredBought') == null) { cc.sys.localStorage.setItem('isScarredBought', false) }
        if (cc.sys.localStorage.getItem('isGeekBought') == null) { cc.sys.localStorage.setItem('isGeekBought', false) }
        if (cc.sys.localStorage.getItem('isMoustachedBought') == null) { cc.sys.localStorage.setItem('isMoustachedBought', false) }
        if (cc.sys.localStorage.getItem('isNormalBoyBought') == null) { cc.sys.localStorage.setItem('isNormalBoyBought', false) }
        if (cc.sys.localStorage.getItem('isNormalGirlBought') == null) { cc.sys.localStorage.setItem('isNormalGirlBought', false) }
        if (cc.sys.localStorage.getItem('isThiefBought') == null) { cc.sys.localStorage.setItem('isThiefBought', false) }
        if (cc.sys.localStorage.getItem('isRacoonBought') == null) { cc.sys.localStorage.setItem('isRacoonBought', false) }
        if (cc.sys.localStorage.getItem('isRedHairedBought') == null) { cc.sys.localStorage.setItem('isRedHairedBought', false) }
        if (cc.sys.localStorage.getItem('money') == null) { cc.sys.localStorage.setItem('money', 0) }
        // For the first release gift money.
        if (cc.sys.localStorage.getItem('money') == "0") { cc.sys.localStorage.setItem('money', 100000) }
        this.timer = 0;
    },

    pause: function () {
        if (!this.isPaused) {
            this.isPaused = true;
            var scaleUp = cc.scaleTo(0.5, 1, 1);
            this.pauseBoard.runAction(scaleUp);
            var rotate = cc.rotateBy(0.5, 720);
            this.pauseBoard.runAction(rotate);
        }
    },

    continue: function () {
        // Çak Buraya reklamı interstitial
        var scaleDown = cc.scaleTo(0.5, 0, 0);
        this.pauseBoard.runAction(scaleDown);
        var rotate = cc.rotateBy(0.5, 720);
        this.pauseBoard.runAction(rotate);

        this.isPaused = false;
    },

    secondChance: function () {
        // Çak Buraya reklamı rewarded
        var player = cc.find("Game/Gameplay/Player");
        player.getComponent('Player').invincibleCatched();
        player.getComponent(cc.Animation).resume();
        player.runAction(cc.rotateBy(0.5, 90));
        var scaleDown = cc.scaleTo(0.5, 0, 0);
        this.endGameBoard.runAction(scaleDown);
        var rotate = cc.rotateBy(0.5, 720);
        this.endGameBoard.runAction(rotate);
        cc.find("Game/Gameplay/EndGame/EndGameBoard/SecondChance").scale = 0;
        cc.find("Game/Gameplay/EndGame/EndGameBoard/BackToMenu").x = 0;
        this.isPaused = false;
    },

    backToMenu: function () {
        cc.find("Game/Gameplay/Player").x = 0;
        cc.find("Game/Gameplay/Player").angle = 0;
        // cc.find("Game/Gameplay/EndGame/EndGameBoard/SecondChance").scale = 1;
        // cc.find("Game/Gameplay/EndGame/EndGameBoard/BackToMenu").x = -140;
        this.camera.isOnMenu = true;
        this.gameOver();
        this.pauseBoard.stopAllActions();
        this.endGameBoard.stopAllActions();
        this.sliderFront.stopAllActions();
        this.currentScoreCircle.stopAllActions();

        this.pauseBoard.scale = 0;
        this.endGameBoard.scale = 0;
        this.sliderFront.runAction(cc.scaleTo(0.1, 0, 1));
        this.currentScoreCircle.x = -500;
        this.isSecondChanceUsed = false;
        this.admob.showInterstitial();
    },

    gameOver: function () {
        var moneyValue = Number(this.totalFoodLabel.string.replace(": ", ""));
        this.money.store(moneyValue);

        var currentScore = Number(this.scoreLabel.string.replace("Score: ", ""));
        var highestScore = cc.sys.localStorage.getItem('highestScore');

        if (Number(highestScore) < currentScore) {
            cc.sys.localStorage.setItem('highestScore', currentScore);
        }

        this.camera.isOnMenu = true;
        cc.find("Game/Gameplay").opacity = 0;
        cc.find("Game/Menu").opacity = 255;
    },

    collided: function () {
        if (!this.isPaused) {
            this.isPaused = true;
            var player = cc.find("Game/Gameplay/Player");
            player.getComponent(cc.Animation).pause();
            player.runAction(cc.rotateBy(0.5, -90));

            if (cc.sys.localStorage.getItem('highestScore') == null) { cc.sys.localStorage.setItem('highestScore', 0) }
            var highestScore = cc.sys.localStorage.getItem('highestScore');
            this.sliderHighestScoreLabel.getComponent(cc.Label).string = highestScore;

            var currentScore = Number(this.scoreLabel.string.replace("Score: ", ""));
            this.sliderCurrentScoreLabel.getComponent(cc.Label).string = currentScore;


            var scaleUp = cc.scaleTo(0.5, 1, 1);
            this.endGameBoard.runAction(scaleUp);
            var rotate = cc.rotateBy(0.5, 720);
            this.endGameBoard.runAction(rotate);

            if (Number(highestScore) == 0 || currentScore >= Number(highestScore)) {
                this.sliderFront.runAction(cc.scaleTo(5, 1, 1));
                this.currentScoreCircle.runAction(cc.moveTo(5, cc.v2(495, 0)));
                this.sdkBoxPlay.submitScore(currentScore);
                cc.sys.localStorage.setItem('highestScore', currentScore);
            } else {
                var ratio = currentScore / Number(highestScore);
                var wayToGo = -495 + (ratio * 1000);

                this.sliderFront.runAction(cc.scaleTo(5, ratio, 1));
                this.currentScoreCircle.runAction(cc.moveTo(5, cc.v2(wayToGo, 0)));
            }
        }
    },

    update: function (dt) { this.timer += dt; }
});
