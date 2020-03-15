cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        this.admobInit();
    },

    admobInit: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.init();

            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function (name) { },
                adViewDidFailToReceiveAdWithError: function (name, msg) { },
                adViewWillPresentScreen: function (name) { },
                adViewDidDismissScreen: function (name) { },
                adViewWillDismissScreen: function (name) { },
                adViewWillLeaveApplication: function (name) { },
                reward(name, currency, amount) { }
            });
        }
    },

    cacheInterstitial: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('MyAdvertisement');
        }
    },

    showInterstitial: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('MyAdvertisement');
        }
    },

    cacheRewarded: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('rewarded');
        }
    },

    showRewarded: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('rewarded');
        }
    },
});
