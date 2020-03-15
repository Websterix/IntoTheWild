var Camera = require("MainCamera");
var Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: { default: null, type: Game },
        camera: { default: null, type: Camera },
        fading: { default: false, visible: false },
        // Background Visuals
        darkSky: { default: null, type: cc.Node },
        starSky: { default: null, type: cc.Node },
        ground1: { default: null, type: cc.Node, visible: false },
        ground2: { default: null, type: cc.Node, visible: false },
        house: { default: null, type: cc.Node, visible: false },
        smoke: { default: null, type: cc.Node, visible: false },
        bush1: { default: null, type: cc.Node, visible: false },
        bush2: { default: null, type: cc.Node, visible: false },
        tree1: { default: null, type: cc.Node, visible: false },
        tree2: { default: null, type: cc.Node, visible: false },
        tree3: { default: null, type: cc.Node, visible: false },
        tree4: { default: null, type: cc.Node, visible: false },
        tree5: { default: null, type: cc.Node, visible: false },
        tree6: { default: null, type: cc.Node, visible: false },
        tree7: { default: null, type: cc.Node, visible: false },
        tree8: { default: null, type: cc.Node, visible: false },
        tree9: { default: null, type: cc.Node, visible: false },
        tree10: { default: null, type: cc.Node, visible: false },
        clouds1: { default: null, type: cc.Node, visible: false },
        clouds2: { default: null, type: cc.Node, visible: false },
        airplane: { default: null, type: cc.Node, visible: false },
        mountain1: { default: null, type: cc.Node, visible: false },
        mountain2: { default: null, type: cc.Node, visible: false },
        // Protogonist
        player: { default: null, type: cc.Node, visible: false },
        playerShadow1: { default: null, type: cc.Node, visible: false },
        playerShadow2: { default: null, type: cc.Node, visible: false },
        playerShadow3: { default: null, type: cc.Node, visible: false },
        // PowerUp Visuals
        shield: { default: null, type: cc.Node, visible: false },
        magnetisation: { default: null, type: cc.Node, visible: false },
        // Reward Viusals
        banana: { default: null, type: cc.Node, visible: false },
        grapes: { default: null, type: cc.Node, visible: false },
        cherries: { default: null, type: cc.Node, visible: false },
        lemon: { default: null, type: cc.Node, visible: false },
        apple: { default: null, type: cc.Node, visible: false },
        pear: { default: null, type: cc.Node, visible: false },
        tomato: { default: null, type: cc.Node, visible: false },
        orange: { default: null, type: cc.Node, visible: false },
        peach: { default: null, type: cc.Node, visible: false },
        // Threat Visuals
        wolf: { default: null, type: cc.Node, visible: false },
        bird1: { default: null, type: cc.Node, visible: false },
        bird2: { default: null, type: cc.Node, visible: false },
        bird3: { default: null, type: cc.Node, visible: false },
        bird4: { default: null, type: cc.Node, visible: false },
        bird5: { default: null, type: cc.Node, visible: false },
        bird6: { default: null, type: cc.Node, visible: false },
        bird7: { default: null, type: cc.Node, visible: false },
        bird8: { default: null, type: cc.Node, visible: false },
        bird9: { default: null, type: cc.Node, visible: false },
        bird10: { default: null, type: cc.Node, visible: false },
        bird11: { default: null, type: cc.Node, visible: false },
        bird12: { default: null, type: cc.Node, visible: false },
        bird13: { default: null, type: cc.Node, visible: false },
        layer2Opacity: { default: 255, visible: false },
        layer3Opacity: { default: 255, visible: false },
        layer4Opacity: { default: 255, visible: false },
        layer5Opacity: { default: 255, visible: false },
    },

    onLoad: function () {
        var fullBrigtColor = new cc.Color(255, 255, 255);

        this.level2Opacity = 255;
        this.level3Opacity = 255;
        this.level4Opacity = 255;
        this.level5Opacity = 255;

        this.ground1 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer5/Ground1");
        this.ground2 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer5/Ground2");

        this.house = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/House");
        this.bush1 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/Bush1");
        this.bush2 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer4/Bush2");

        this.tree1 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree1");
        this.tree2 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree2");
        this.tree3 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree3");
        this.tree4 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree4");
        this.tree5 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree5");
        this.tree6 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree6");
        this.tree7 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree7");
        this.tree8 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree8");
        this.tree9 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree9");
        this.tree10 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer3/Tree10");

        this.clouds1 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Clouds1");
        this.clouds2 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Clouds2");
        this.airplane = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer2/Airplane");

        this.mountain1 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer1/Mountain1");
        this.mountain2 = cc.find("Game/Gameplay/BackgroundCanvas/Parallaxes/Layer1/Mountain2");

        this.player = cc.find("Game/Gameplay/Player");
        this.playerShadow1 = cc.find("Game/Gameplay/PlayerShadow1");
        this.playerShadow2 = cc.find("Game/Gameplay/PlayerShadow2");
        this.playerShadow3 = cc.find("Game/Gameplay/PlayerShadow3");

        this.shield = cc.find("Game/Gameplay/Shield");
        this.magnetisation = cc.find("Game/Gameplay/Magnetisation");

        this.banana = cc.find("Game/Gameplay/Rewards/Banana");
        this.grapes = cc.find("Game/Gameplay/Rewards/Grapes");
        this.cherries = cc.find("Game/Gameplay/Rewards/Cherries");
        this.lemon = cc.find("Game/Gameplay/Rewards/Lemon");
        this.apple = cc.find("Game/Gameplay/Rewards/Apple");
        this.pear = cc.find("Game/Gameplay/Rewards/Pear");
        this.tomato = cc.find("Game/Gameplay/Rewards/Tomato");
        this.orange = cc.find("Game/Gameplay/Rewards/Orange");
        this.peach = cc.find("Game/Gameplay/Rewards/Peach");

        this.wolf = cc.find("Game/Gameplay/Obstacles/Wolf");

        this.bird1 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird1");
        this.bird2 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird2");
        this.bird3 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird3");
        this.bird4 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird4");
        this.bird5 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird5");
        this.bird6 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird6");
        this.bird7 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird7");
        this.bird8 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird8");
        this.bird9 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird9");
        this.bird10 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird10");
        this.bird11 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird11");
        this.bird12 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird12");
        this.bird13 = cc.find("Game/Gameplay/Obstacles/FlyingBirds/Bird13");

        this.resetDay();
    },

    resetDay: function () {
        var fullBrigtColor = new cc.Color(255, 255, 255);
        this.layer2Opacity = 255;
        this.layer3Opacity = 255;
        this.layer4Opacity = 255;
        this.layer5Opacity = 255;

        this.setShadesLayer1(fullBrigtColor);
        this.setShadesLayer2(fullBrigtColor);
        this.setShadesLayer3(fullBrigtColor);
        this.setShadesLayer4(fullBrigtColor);
        this.setShadesLayer5(fullBrigtColor);
    },

    setShadesLayer1: function (shadeColor) {
        this.mountain1.color = shadeColor; this.mountain2.color = shadeColor;
    },
    setShadesLayer2: function (shadeColor) {
        this.clouds1.color = shadeColor; this.clouds2.color = shadeColor; this.airplane.color = shadeColor;
    },
    setShadesLayer3: function (shadeColor) {
        this.tree1.color = shadeColor; this.tree2.color = shadeColor; this.tree3.color = shadeColor; this.tree4.color = shadeColor; this.tree5.color = shadeColor;
        this.tree6.color = shadeColor; this.tree7.color = shadeColor; this.tree8.color = shadeColor; this.tree9.color = shadeColor; this.tree10.color = shadeColor;

    },
    setShadesLayer4: function (shadeColor) {
        this.bush1.color = shadeColor; this.bush2.color = shadeColor; this.house.color = shadeColor;
    },
    setShadesLayer5: function (shadeColor) {
        this.ground1.color = shadeColor; this.ground2.color = shadeColor;
        this.player.color = shadeColor; this.playerShadow1.color = shadeColor; this.playerShadow2.color = shadeColor; this.playerShadow3.color = shadeColor;
        this.shield.color = shadeColor; this.magnetisation.color = shadeColor;
        this.banana.color = shadeColor; this.grapes.color = shadeColor; this.cherries.color = shadeColor; this.lemon.color = shadeColor; this.apple.color = shadeColor;
        this.pear.color = shadeColor; this.tomato.color = shadeColor; this.orange.color = shadeColor; this.peach.color = shadeColor;
        this.wolf.color = shadeColor;
        this.bird1.color = shadeColor; this.bird2.color = shadeColor; this.bird3.color = shadeColor; this.bird4.color = shadeColor; this.bird5.color = shadeColor;
        this.bird6.color = shadeColor; this.bird7.color = shadeColor; this.bird8.color = shadeColor; this.bird9.color = shadeColor; this.bird10.color = shadeColor;
        this.bird11.color = shadeColor; this.bird12.color = shadeColor; this.bird13.color = shadeColor;
    },

    update: function (dt) {
        if (this.game.isPaused) { return; }

        if (this.camera.isOnMenu) {
            this.resetDay();
            return;
        }

        this.node.x = this.player.x + 350;
        this.darkSky.x = this.player.x + 350;
        this.starSky.x = this.player.x + 350;

        if (this.node.opacity >= 255) {
            this.fading = true;
        }

        if (this.node.opacity <= 0) {
            this.fading = false;
        }

        // Opacity Change Factor = Desires how fast day returns to
        var ocf = 0.1;

        if (this.fading) {
            this.node.opacity -= ocf;
            this.darkSky.opacity += ocf;
            if (this.darkSky.opacity > 200) {
                this.starSky.opacity += ocf * 2;
            }
            this.layer2Opacity = this.layer2Opacity - (ocf * 0.95);
            this.layer3Opacity = this.layer3Opacity - (ocf * 0.7);
            this.layer4Opacity = this.layer4Opacity - (ocf * 0.6);
            this.layer5Opacity = this.layer5Opacity - (ocf * 0.4);
            this.setShadesLayer1(new cc.Color(this.node.opacity, this.node.opacity, this.node.opacity));
            this.setShadesLayer2(new cc.Color(this.layer2Opacity, this.layer2Opacity, this.layer2Opacity));
            this.setShadesLayer3(new cc.Color(this.layer3Opacity, this.layer3Opacity, this.layer3Opacity));
            this.setShadesLayer4(new cc.Color(this.layer4Opacity, this.layer4Opacity, this.layer4Opacity));
            this.setShadesLayer5(new cc.Color(this.layer5Opacity, this.layer5Opacity, this.layer5Opacity));
        }
        else {
            this.node.opacity += ocf;
            this.darkSky.opacity -= ocf;
            if (this.darkSky.opacity < 200 && this.starSky.opacity > 0) {
                this.starSky.opacity -= ocf * 2;
            }
            this.layer2Opacity = this.layer2Opacity + (ocf * 0.95);
            this.layer3Opacity = this.layer3Opacity + (ocf * 0.7);
            this.layer4Opacity = this.layer4Opacity + (ocf * 0.6);
            this.layer5Opacity = this.layer5Opacity + (ocf * 0.4);
            this.setShadesLayer1(new cc.Color(this.node.opacity, this.node.opacity, this.node.opacity));
            this.setShadesLayer2(new cc.Color(this.layer2Opacity, this.layer2Opacity, this.layer2Opacity));
            this.setShadesLayer3(new cc.Color(this.layer3Opacity, this.layer3Opacity, this.layer3Opacity));
            this.setShadesLayer4(new cc.Color(this.layer4Opacity, this.layer4Opacity, this.layer4Opacity));
            this.setShadesLayer5(new cc.Color(this.layer5Opacity, this.layer5Opacity, this.layer5Opacity));
        }
    }
});
