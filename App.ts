var BotName = '', // 
    DiscordChannel = '', //channel to send requests
    DiscordEmail = "", //discord email for login example: mymail@email.com
    DiscordPassword = "" //password for discord
var streamers = [
    { "name": "supremetokyo", "online": 0 },
    { "name": "fallaste", "online": 0 },
    { "name": "farasalt", "online": 0 },
    { "name": "captain_richard", "online": 0 },
    { "name": "montoyaaa", "online": 0 },
    { "name": "russianj_test", "online": 0 },
    { "name": "badnewsbaron", "online": 0 },
    { "name": "kiltedfrog", "online": 0 },
    { "name": "princessflaafy", "online": 0 },
    { "name": "euthanize91", "online": 0 },
    { "name": "hpbraincase", "online": 0 },
    { "name": "grakees", "online": 0 },
    { "name": "skyyhawkyt", "online": 0 },
    { "name": "biogenx2b", "online": 0 },
    { "name": "anarck0s", "online": 0 },
    { "name": "slowfusegaming", "online": 0 },
    { "name": "admiral_nolan", "online": 0 },
    { "name": "programmersam", "online": 0 },
    { "name": "wykstrom", "online": 0 },
    { "name": "shadowvinez", "online": 0 },
    { "name": "bod699", "online": 0 },
    { "name": "virtualfreedom", "online": 0 },
    { "name": "sgt_gamble", "online": 0 }
];

function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return i;
}
//---------------------------------------------------------------------------------------------------------
//discord connection
//---------------------------------------------------------------------------------------------------------
/*Variable area*/
var Discordbot = require('discord.io');
var request = require('request');
var moment = require('moment');
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
    bot.joinVoiceChannel(DiscordChannel, function () { });
    setInterval(function () {
        var current = new Date();
        current.setSeconds(current.getSeconds() - 600);
     
        for (var i = 0, len = streamers.length - 1; i < len; i++) {
            request('https://api.twitch.tv/kraken/streams/' + streamers[i].name, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    if (info.stream != null) {
                        
                        var stream = findElement(streamers, "name", info.stream.channel.name);
                        console.log(streamers[stream].name +" : "+ streamers[stream].online);
                        if (streamers[stream].online == 0) {
                            streamers[stream].online = 1;
                            
                            console.log(info.stream.channel.url);
                            var streamdate = new Date(info.stream.created_at);
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
                    else {
                        var splitstream = info._links.channel.split("/");
                        var stream = findElement(streamers, "name", splitstream[splitstream.length - 1]);
                        
                        if (streamers[stream].online == 1) { console.log(splitstream[splitstream.length - 1] + "has gone offline");streamers[stream].online = 0; }
                    }
                }
            }).on('error', function (err) {console.log(err)});
        }
    }, 30000);
});
var cstream;
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    if ((user !== BotName) && (channelID.toString() === "75630661951557632") && (undefined != user)) {
        if (message === "!heyheyhey") {
            if (cstream) {
                cstream.stopAudioFile();
            }
                bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {
                 stream.playAudioFile('heyheyhey.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if (message === "!alfredhill") {
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {
                stream.playAudioFile('music.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if (message === "!interstellar") {
            if (cstream) {
                cstream.stopAudioFile();
            }
                bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {

                    stream.playAudioFile('interstellar.mp3'); //To start playing an audio file, will stop when it's done.
                    cstream = stream
                });
        }
        if (message === "!USSR") {
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {

                stream.playAudioFile('USSR.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if (message === "!Trumpet") {
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {

                stream.playAudioFile('Trumpet.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if (message === "!RATMMarch") {
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {

                stream.playAudioFile('RATMMarch.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if (message === "!March") {
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {

                stream.playAudioFile('March.mp3'); //To start playing an audio file, will stop when it's done.
                cstream = stream
                });
        }
        if ((message === "!cena") && (user == 'Vinez')) {
            
            if (cstream) {
                cstream.stopAudioFile();
            }
            bot.leaveVoiceChannel(DiscordChannel)
            bot.joinVoiceChannel(DiscordChannel, function () {
            bot.testAudio({ channel: DiscordChannel, stereo: true }, function (stream) {
                stream.playAudioFile('cena.mp3');
                cstream = stream
                    stream.once('fileEnd', function () {
                    bot.leaveVoiceChannel(DiscordChannel)
                    bot.joinVoiceChannel(DiscordChannel)
                });
            });
            

          });
        }
        if (message === "!nomusic") {
          cstream.stopAudioFile();

        }
    }
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

