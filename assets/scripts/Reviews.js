cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        this.reviewsInit();
    },

    reviewsInit: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginReview.init();
            sdkbox.PluginReview.show();
        }
    },
});
