var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);


var autocorrect = require('autocorrect');
io.sockets.on('connection' , newConnection);

var rive = require('rivescript');

var bot = new rive();
bot.loadFile("RiveScript/begin.rive",chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutCollege.rive" , chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutBot.rive" , chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutAdmission.rive", chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutDepartment.rive", chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutHostel.rive", chatBotReady , chatBotError);
bot.loadFile("RiveScript/aboutLibrary.rive", chatBotReady , chatBotError);


function chatBotReady (batch_num) {
	console.log("Batch #" + batch_num + " has finished loading!");
	bot.sortReplies();
}

function chatBotError (error) {
	console.log("Error when loading files: " + error);
}

function newConnection(socket) {
		console.log("New Connection : "+socket.id);
    socket.on('Quest', function(data, fn) {
      let replyFromBot = bot.reply("local-user", data);
			console.log(socket.id+ ": "+data);
      console.log("bot: "+replyFromBot);
      fn(replyFromBot);
    });
}
