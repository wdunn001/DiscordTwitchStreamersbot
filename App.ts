var BotName = 'StreamBot', // 
    DiscordChannel = '', //channel to send requests
    DiscordEmail = "", //discord email for login example: mymail@email.com
    DiscordPassword = "" //password for discord
var streamers = ['supremetokyo', 'fallaste', 'farasalt', 'wykstrom', 'captain_richard', 'montoyaaa','russianj_test','badnewsbaron','kiltedfrog','princessflaafy','euthanize91','hpbraincase','grakees','skyyhawkyt','biogenx2b','anarck0s','slowfusegaming','admiral_nolan','programmersam','wykstrom','shadowvinez'];
//---------------------------------------------------------------------------------------------------------
//discord connection
//---------------------------------------------------------------------------------------------------------
/*Variable area*/
var Discordbot = require('discord.io');
var request = require('request');
var bot = new Discordbot({
    email: DiscordEmail,
    password: DiscordPassword,
    autorun: true
});
bot.on("ready", function (rawEvent) {
    console.log("Connected!");
    console.log("Logged in as: ");
    console.log(bot.username);
    console.log(bot.id);
    console.log("----------");
    setInterval(function () {
        var current = new Date();
        current.setSeconds(current.getSeconds() - 100);

        for (var i = 0, len = streamers.length; i < len; i++) {
                        request('https://api.twitch.tv/kraken/streams/' + streamers[i], function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var info = JSON.parse(body);
                                if (info.stream != null) {
                                    console.log(info.stream.channel.url);
                                    var streamdate = new Date(info.stream.created_at);
                                    console.log(streamdate);
                                    console.log(current);
                                 if (streamdate > current) {
                            bot.sendMessage({
                                to: DiscordChannel,
                                message: info.stream.channel.url + " is online playing " + info.stream.game + " check it out! ",
                                nonce: "80085" //Optional
                            }, function (response) { //CB Optional
                                    console.log(response.id); //Message ID
                                });
                        }
                    }
                }
            });
        }
    }, 30000);
});

/*Event area*/
bot.on("err", function (error) {
    console.log(error)
});

bot.on("presence", function (user, userID, status, rawEvent) {
    /*console.log(user + " is now: " + status);*/
});

bot.on("debug", function (rawEvent) {
   //console.log(rawEvent)//Logs every event
});

bot.on("disconnected", function () {
    console.log("Bot disconnected");
    /*bot.connect()*/ //Auto reconnect
});

/*Function declaration area*/
function sendMessages(ID, messageArr, interval) {
    var len = messageArr.length;
    var callback;
    var resArr = [];
    typeof (arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
    if (typeof (interval) !== 'number') interval = 250;

    function _sendMessages() {
        setTimeout(function () {
            if (messageArr.length > 0) {
                bot.sendMessage({
                    to: ID,
                    message: messageArr[0]
                }, function (res) {
                        resArr.push(res);
                    });
                messageArr.splice(0, 1);
                _sendMessages();
            }
        }, interval);
    }
    _sendMessages();

    var checkInt = setInterval(function () {
        if (resArr.length === len) {
            if (typeof (callback) === 'function') {
                callback(resArr);
            }
            clearInterval(checkInt);
        }
    }, 0);
}
function sendFiles(channelID, fileArr, interval) {
    var len = fileArr.length;
    var callback;
    var resArr = [];
    typeof (arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
    if (typeof (interval) !== 'number') interval = 500;

    function _sendFiles() {
        setTimeout(function () {
            if (fileArr.length > 0) {
                bot.uploadFile({
                    channel: channelID,
                    file: fileArr[0]
                }, function (res) {
                        resArr.push(res);
                    });
                fileArr.splice(0, 1);
                _sendFiles();
            }
        }, interval);
    }
    _sendFiles();

    var checkInt = setInterval(function () {
        if (resArr.length === len) {
            if (typeof (callback) === 'function') {
                callback(resArr);
            }
            clearInterval(checkInt);
        }
    }, 0);
}

