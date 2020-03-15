cc.Class({
    extends: cc.Component,

    properties: {
        foodBasket: { default: null, type: cc.Node },
        foodValueLabel: { default: null, type: cc.Label },

        dashLevels: { default: null, visible: false },
        dashLevel0: { default: null, type: cc.SpriteFrame }, dashLevel1: { default: null, type: cc.SpriteFrame },
        dashLevel2: { default: null, type: cc.SpriteFrame }, dashLevel3: { default: null, type: cc.SpriteFrame },
        dashLevel4: { default: null, type: cc.SpriteFrame }, dashLevel5: { default: null, type: cc.SpriteFrame },

        invincibleLevels: { default: null, visible: false },
        invincibleLevel0: { default: null, type: cc.SpriteFrame }, invincibleLevel1: { default: null, type: cc.SpriteFrame },
        invincibleLevel2: { default: null, type: cc.SpriteFrame }, invincibleLevel3: { default: null, type: cc.SpriteFrame },
        invincibleLevel4: { default: null, type: cc.SpriteFrame }, invincibleLevel5: { default: null, type: cc.SpriteFrame },

        magnetLevels: { default: null, visible: false },
        magnetLevel0: { default: null, type: cc.SpriteFrame }, magnetLevel1: { default: null, type: cc.SpriteFrame },
        magnetLevel2: { default: null, type: cc.SpriteFrame }, magnetLevel3: { default: null, type: cc.SpriteFrame },
        magnetLevel4: { default: null, type: cc.SpriteFrame }, magnetLevel5: { default: null, type: cc.SpriteFrame },

        basePrice: { default: 2000, visible: false }
    },

    onLoad() {
        if (cc.sys.localStorage.getItem('dashLevel') == null) { cc.sys.localStorage.setItem('dashLevel', 0); }
        if (cc.sys.localStorage.getItem('invincibleLevel') == null) { cc.sys.localStorage.setItem('invincibleLevel', 0); }
        if (cc.sys.localStorage.getItem('magnetLevel') == null) { cc.sys.localStorage.setItem('magnetLevel', 0); }

        var dashLevel = cc.sys.localStorage.getItem('dashLevel');
        var magnetLevel = cc.sys.localStorage.getItem('magnetLevel');
        var invincibleLevel = cc.sys.localStorage.getItem('invincibleLevel');

        this.dashLevels = new Map();
        this.dashLevels.set("0", this.dashLevel0); this.dashLevels.set("1", this.dashLevel1);
        this.dashLevels.set("2", this.dashLevel2); this.dashLevels.set("3", this.dashLevel3);
        this.dashLevels.set("4", this.dashLevel4); this.dashLevels.set("5", this.dashLevel5);

        this.invincibleLevels = new Map();
        this.invincibleLevels.set("0", this.invincibleLevel0); this.invincibleLevels.set("1", this.invincibleLevel1);
        this.invincibleLevels.set("2", this.invincibleLevel2); this.invincibleLevels.set("3", this.invincibleLevel3);
        this.invincibleLevels.set("4", this.invincibleLevel4); this.invincibleLevels.set("5", this.invincibleLevel5);

        this.magnetLevels = new Map();
        this.magnetLevels.set("0", this.magnetLevel0); this.magnetLevels.set("1", this.magnetLevel1);
        this.magnetLevels.set("2", this.magnetLevel2); this.magnetLevels.set("3", this.magnetLevel3);
        this.magnetLevels.set("4", this.magnetLevel4); this.magnetLevels.set("5", this.magnetLevel5);

        if (dashLevel == "5") { cc.find("Game/Menu/ShopLayer/Upgrades/Dash/Buy").opacity = 0; }
        if (invincibleLevel == "5") { cc.find("Game/Menu/ShopLayer/Upgrades/Invincibility/Buy").opacity = 0; }
        if (magnetLevel == "5") { cc.find("Game/Menu/ShopLayer/Upgrades/Magnet/Buy").opacity = 0; }

        cc.find("Game/Menu/ShopLayer/Upgrades/Dash/DashBar").getComponent(cc.Sprite).spriteFrame = this.dashLevels.get(dashLevel);
        var price = cc.find("Game/Menu/ShopLayer/Upgrades/Dash/Buy/Price").getComponent(cc.Label);
        price.string = this.basePrice * (Number(dashLevel) + 1);

        cc.find("Game/Menu/ShopLayer/Upgrades/Invincible/InvincibleBar").getComponent(cc.Sprite).spriteFrame = this.invincibleLevels.get(invincibleLevel);
        var price = cc.find("Game/Menu/ShopLayer/Upgrades/Invincible/Buy/Price").getComponent(cc.Label);
        price.string = this.basePrice * (Number(invincibleLevel) + 1);

        cc.find("Game/Menu/ShopLayer/Upgrades/Magnet/MagnetBar").getComponent(cc.Sprite).spriteFrame = this.magnetLevels.get(magnetLevel);
        var price = cc.find("Game/Menu/ShopLayer/Upgrades/Magnet/Buy/Price").getComponent(cc.Label);
        price.string = this.basePrice * (Number(magnetLevel) + 1);
    },

    resetBasket: function () { this.foodBasket.angle = 0; },

    tiltBasket: function () {
        var rotateRight = cc.rotateBy(0.05, 15); var rotateLeft = cc.rotateBy(0.1, -30);
        var resetBasket = cc.callFunc(this.resetBasket, this);
        var sequence = cc.sequence(rotateRight, rotateLeft, rotateRight, resetBasket);
        this.foodBasket.runAction(sequence);
    },

    buyDash: function (event) {
        if (cc.sys.localStorage.getItem('dashLevel') == "5") { return; }

        var buy = event.target;
        var price = Number(buy.getChildByName('Price').getComponent(cc.Label).string);
        var money = Number(this.foodValueLabel.string.replace(": ", ""));
        if (price <= money) {
            var level = Number(cc.sys.localStorage.getItem('dashLevel')) + 1;
            cc.sys.localStorage.setItem('dashLevel', level);

            cc.find("Game/Menu/ShopLayer/Upgrades/Dash/DashBar").getComponent(cc.Sprite).spriteFrame = this.dashLevels.get(level.toString());
            cc.find("Game/Gameplay/PowerUps/Dash").getComponent('Dash').dashTime = 15 + (3*level);

            var currentMoney = money - price;
            cc.sys.localStorage.setItem('money', currentMoney);
            this.foodValueLabel.string = ": " + currentMoney;

            if (level == 5) { buy.opacity = 0; }
            else { buy.getChildByName('Price').getComponent(cc.Label).string = this.basePrice * (level + 1); }
        }
        else { this.tiltBasket(); }
    },

    buyInvincible: function (event) {
        if (cc.sys.localStorage.getItem('invincibleLevel') == "5") { return; }

        var buy = event.target;
        var price = Number(buy.getChildByName('Price').getComponent(cc.Label).string);
        var money = Number(this.foodValueLabel.string.replace(": ", ""));
        if (price <= money) {
            var level = Number(cc.sys.localStorage.getItem('invincibleLevel')) + 1;
            cc.sys.localStorage.setItem('invincibleLevel', level);

            cc.find("Game/Menu/ShopLayer/Upgrades/Invincible/InvincibleBar").getComponent(cc.Sprite).spriteFrame = this.invincibleLevels.get(level.toString());
            cc.find("Game/Gameplay/PowerUps/Invincibility").getComponent('Invincible').invincibleTime = 15 + (3*level);

            var currentMoney = money - price;
            cc.sys.localStorage.setItem('money', currentMoney);
            this.foodValueLabel.string = ": " + currentMoney;

            if (level == 5) { buy.opacity = 0; }
            else { buy.getChildByName('Price').getComponent(cc.Label).string = this.basePrice * (level + 1); }
        }
        else { this.tiltBasket(); }
    },

    buyMagnet: function (event) {
        if (cc.sys.localStorage.getItem('magnetLevel') == "5") { return; }

        var buy = event.target;
        var price = Number(buy.getChildByName('Price').getComponent(cc.Label).string);
        var money = Number(this.foodValueLabel.string.replace(": ", ""));
        if (price <= money) {
            var level = Number(cc.sys.localStorage.getItem('magnetLevel')) + 1;
            cc.sys.localStorage.setItem('magnetLevel', level);

            cc.find("Game/Menu/ShopLayer/Upgrades/Magnet/MagnetBar").getComponent(cc.Sprite).spriteFrame = this.magnetLevels.get(level.toString());
            cc.find("Game/Gameplay/PowerUps/Magnet").getComponent('Magnet').magnetTime = 15 + (3*level);

            var currentMoney = money - price;
            cc.sys.localStorage.setItem('money', currentMoney);
            this.foodValueLabel.string = ": " + currentMoney;

            if (level == 5) { buy.opacity = 0; }
            else { buy.getChildByName('Price').getComponent(cc.Label).string = this.basePrice * (level + 1); }
        }
        else { this.tiltBasket(); }
    }

});
