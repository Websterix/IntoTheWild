cc.Class({
    extends: cc.Sprite,

    properties: {
        soundOn: { default: null, type: cc.SpriteFrame },
        soundOff: { default: null, type: cc.SpriteFrame },
        isSoundOn: { default: true, visible: true }
    },

    onLoad: function() {
        var x = this.isSoundOn ? this.soundOn : this.soundOff;
        this.node.getComponent(cc.Sprite).spriteFrame = x;
    },

    toggleSound: function () {
        this.isSoundOn = !this.isSoundOn;
        var x = this.isSoundOn ? this.soundOn : this.soundOff;
        this.node.getComponent(cc.Sprite).spriteFrame = x;
        if (this.isSoundOn) {
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else {
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }
});
