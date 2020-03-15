cc.Class({
    extends: cc.Component,
    properties: {
        player: { default: null, type: cc.Animation },
        playerShadow1: { default: null, type: cc.Animation },
        playerShadow2: { default: null, type: cc.Animation },
        playerShadow3: { default: null, type: cc.Animation },
        selection: { default: 1, visible: false },
        selectionFrame: { default: null, type: cc.Node },
        animations: { default: null, visible: false },
        foodBasket: { default: null, type: cc.Node },
        foodValueLabel: { default: null, type: cc.Label }
    },

    onLoad: function () {
        this.animations = new Map();
        this.animations.set(1, 'Bearded'); this.animations.set(2, 'Scarred'); this.animations.set(3, 'Geek');
        this.animations.set(4, 'Moustached'); this.animations.set(5, 'NormalBoy'); this.animations.set(6, 'NormalGirl');
        this.animations.set(7, 'Thief'); this.animations.set(8, 'RedHaired'); this.animations.set(9, 'Racoon');

        cc.sys.localStorage.setItem('isBeardedBought', true);

        var shadowColor = new cc.Color(120, 120, 120);
        var characters = cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters");
        characters.getChildByName('Scarred').color = shadowColor;
        characters.getChildByName('Geek').color = shadowColor;
        characters.getChildByName('Moustached').color = shadowColor;
        characters.getChildByName('NormalBoy').color = shadowColor;
        characters.getChildByName('NormalGirl').color = shadowColor;
        characters.getChildByName('Thief').color = shadowColor;
        characters.getChildByName('RedHaired').color = shadowColor;
        characters.getChildByName('Racoon').color = shadowColor;

        if (cc.sys.localStorage.getItem('isScarredBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/Scarred/Buy")); }
        if (cc.sys.localStorage.getItem('isGeekBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/Geek/Buy")); }
        if (cc.sys.localStorage.getItem('isMoustachedBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/Moustached/Buy")); }
        if (cc.sys.localStorage.getItem('isNormalBoyBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/NormalBoy/Buy")); }
        if (cc.sys.localStorage.getItem('isNormalGirlBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/NormalGirl/Buy")); }
        if (cc.sys.localStorage.getItem('isThiefBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/Thief/Buy")); }
        if (cc.sys.localStorage.getItem('isRedHairedBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/RedHaired/Buy")); }
        if (cc.sys.localStorage.getItem('isRacoonBought') == 'true') { this.removeLock(cc.find("Game/Menu/ShopLayer/CharacterSelection/Characters/Racoon/Buy")); }
    },

    removeLock: function (buy) { buy.getChildByName('Lock').opacity = 0; buy.opacity = 0; buy.getParent().color = new cc.Color(255, 255, 255); },
    resetBasket: function () { this.foodBasket.angle = 0; },

    tiltBasket: function () {
        var rotateRight = cc.rotateBy(0.05, 15); var rotateLeft = cc.rotateBy(0.1, -30);
        var resetBasket = cc.callFunc(this.resetBasket, this);
        var sequence = cc.sequence(rotateRight, rotateLeft, rotateRight, resetBasket);
        this.foodBasket.runAction(sequence);
    },

    buy: function (event, customData) {
        if (cc.sys.localStorage.getItem(customData) == 'false') {
            var buy = event.target;
            var price = Number(buy.getChildByName('Price').getComponent(cc.Label).string);
            var money = Number(this.foodValueLabel.string.replace(": ", ""));
            if (price <= money) {
                var currentMoney = money - price;
                cc.sys.localStorage.setItem('money', currentMoney);
                this.foodValueLabel.string = ": " + currentMoney;

                buy.getChildByName('Lock').opacity = 0;
                cc.sys.localStorage.setItem(customData, true);
                buy.opacity = 0
                buy.getParent().color = new cc.Color(255, 255, 255);
            }
            else { this.tiltBasket(); }
        }
    },

    select: function (event, customData) {
        this.selection = Number(customData);
        var charName = this.animations.get(this.selection);
        var isBought = "is" + charName + "Bought";
        if (cc.sys.localStorage.getItem(isBought) == 'true') {
            this.switchCharacter();
        }
    },

    switchCharacter: function () {
        this.selectionFrame.x = 150 * (this.selection - 1);
        this.player.play(this.animations.get(this.selection));
        this.playerShadow1.play(this.animations.get(this.selection));
        this.playerShadow2.play(this.animations.get(this.selection));
        this.playerShadow3.play(this.animations.get(this.selection));
    }
});
