var Camera = require("MainCamera");

cc.Class({
    extends: cc.Component,

    properties: {
        camera: { default: null, type: Camera },
        menuMusic: { default: null, type: cc.AudioClip },
        runningMusic1: { default: null, type: cc.AudioClip },
        runningMusic2: { default: null, type: cc.AudioClip },
        activeMusic: { default: 1, visible: false },
        lastRunningMusic: { default: 1, visible: false },
        isMusicPlaying: { default: false, visible: false }
    },

    playMusic: function (music, id) {
        cc.audioEngine.playMusic(music, true);
        this.activeMusic = id;
        this.isMusicPlaying = true;
    },

    stopMusic: function () {
        cc.audioEngine.stopMusic();
        this.isMusicPlaying = false;
    },

    onLoad: function () {
        this.playMusic(this.menuMusic, 0);
    },

    update: function () {
        if (this.camera.isOnMenu) {
            if (this.isMusicPlaying) {
                if (this.activeMusic != 0) {
                    this.stopMusic();
                    this.playMusic(this.menuMusic, 0);
                }
            }
        }
        else {
            if (this.activeMusic == 0 && this.isMusicPlaying) {
                this.stopMusic();
            }

            if (!this.isMusicPlaying) {
                if (this.lastRunningMusic == 1) {
                    this.lastRunningMusic = 2;
                    this.playMusic(this.runningMusic2, 2);
                }
                else {
                    this.lastRunningMusic = 1;
                    this.playMusic(this.runningMusic1, 1);
                }
            }
        }
    },
});