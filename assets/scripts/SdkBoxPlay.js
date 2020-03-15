cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        this.sdkBoxPlayInit();
    },

    sdkBoxPlayInit: function () {
        if (cc.sys.isMobile) {
            var plugin = sdkbox.PluginSdkboxPlay
            plugin.setListener({
                onConnectionStatusChanged: function (connection_status) {
                    cc.log("connection status change: " + connection_status + " connection_status");
                    if (connection_status == 1000) {
                        cc.log('Player id: ' + plugin.getPlayerId());
                        cc.log('Player name: ' + plugin.getPlayerAccountField("name"));
                        me.info.setString("connection status: " + connection_status + " " + plugin.getPlayerId() + " " + plugin.getPlayerAccountField("name") + "(" + plugin.getPlayerAccountField("display_name") + ")");
                    } else {
                        me.info.setString("Not connected. Status: " + connection_status);
                    }
                },
                onScoreSubmitted: function (leaderboard_name, score, maxScoreAllTime, maxScoreWeek, maxScoreToday) {
                    cc.log('TESTME -> onScoreSubmitted trigger leaderboard_name:' + leaderboard_name + ' score:' + score + ' maxScoreAllTime:' + maxScoreAllTime + ' maxScoreWeek:' + maxScoreWeek + ' maxScoreToday:' + maxScoreToday);
                },
                onMyScore: function (leaderboard_name, time_span, collection_type, score) {
                    cc.log('TESTME ->onMyScore trigger leaderboard_name:' + leaderboard_name + ' time_span:' + time_span + ' collection_type:' + collection_type + ' score:' + score);
                },
                onMyScoreError: function (leaderboard_name, time_span, collection_type, error_code, error_description) {
                    cc.log('TESTME ->onMyScoreError trigger leaderboard_name:' + leaderboard_name + ' time_span:' + time_span + ' collection_type:' + collection_type + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onPlayerCenteredScores: function (leaderboard_name, time_span, collection_type, json_with_score_entries) {
                    cc.log('TESTME ->onPlayerCenteredScores trigger leaderboard_name:' + leaderboard_name + ' time_span:' + time_span + ' collection_type:' + collection_type + ' json_with_score_entries:' + json_with_score_entries);
                },
                onPlayerCenteredScoresError: function (leaderboard_name, time_span, collection_type, error_code, error_description) {
                    cc.log('TESTME ->onPlayerCenteredScoresError trigger leaderboard_name:' + leaderboard_name + ' time_span:' + time_span + ' collection_type:' + collection_type + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onIncrementalAchievementUnlocked: function (achievement_name) {
                    cc.log("TESTME ->incremental achievement " + achievement_name + " unlocked.");
                },
                onIncrementalAchievementStep: function (achievement_name, step) {
                    cc.log("TESTME ->incremental achievent " + achievement_name + " step: " + step);
                },
                onIncrementalAchievementStepError: function (name, steps, error_code, error_description) {
                    cc.log('TESTME ->onIncrementalAchievementStepError trigger leaderboard_name:' + name + ' steps:' + steps + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onAchievementUnlocked: function (achievement_name, newlyUnlocked) {
                    cc.log('TESTME ->onAchievementUnlocked trigger achievement_name:' + achievement_name + ' newlyUnlocked:' + newlyUnlocked);
                },
                onAchievementUnlockError: function (achievement_name, error_code, error_description) {
                    cc.log('TESTME ->onAchievementUnlockError trigger achievement_name:' + achievement_name + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onAchievementsLoaded: function (reload_forced, json_achievements_info) {
                    cc.log('TESTME ->onAchievementsLoaded trigger reload_forced:' + reload_forced + ' json_achievements_info:' + json_achievements_info);
                },
                onSetSteps: function (name, steps) {
                    cc.log('TESTME ->onSetSteps trigger name:' + name + ' steps:' + steps);
                },
                onSetStepsError: function (name, steps, error_code, error_description) {
                    cc.log('TESTME ->onSetStepsError trigger name:' + name + ' steps:' + steps + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onReveal: function (name) {
                    cc.log('TESTME ->onReveal trigger name:' + name);
                },
                onRevealError: function (name, error_code, error_description) {
                    cc.log('TESTME ->onRevealError trigger name:' + name + ' error_code:' + error_code + ' error_description:' + error_description);
                },
                onGameData: function (action, name, data, error) {
                    if (error) {
                        // failed
                        cc.log('TESTME ->onGameData failed:' + error);
                    } else {
                        //success
                        if ('load' == action) {
                            cc.log('TESTME ->onGameData load:' + name + ':' + data);
                        } else if ('save' == action) {
                            cc.log('TESTME ->onGameData save:' + name + ':' + data);
                        } else {
                            cc.log('TESTME ->onGameData unknown action:' + action);
                        }
                    }
                }
            });
            plugin.init();

            if (plugin.isSignedIn()) {
                plugin.signout();
            } else {
                plugin.signin();
            }
        }
    },

    isSignedIn: function () {
        return sdkbox.PluginSdkboxPlay.isSignedIn();
    },

    submitScore: function (myScore) {
        if (cc.sys.isMobile) {
            sdkbox.PluginSdkboxPlay.submitScore('IntoTheWildLeaderboard', myScore)
        }
    },

    showLeaderBoard: function () {
        if (cc.sys.isMobile) {
            sdkbox.PluginSdkboxPlay.showLeaderboard('IntoTheWildLeaderboard');
        }
    },
});
