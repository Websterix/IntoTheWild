cc.Class({
    extends: cc.Component,
    properties: {
        player: { default: null, type: cc.Node },
        totalFoodLabel: { default: null, type: cc.Label }
    },

    onLoad: function () {
        var moneyValue = cc.sys.localStorage.getItem('money');
        this.totalFoodLabel.string = ": " + moneyValue;
    },

    store: function (moneyValue) {
        cc.sys.localStorage.setItem('money', moneyValue);
    },
});
