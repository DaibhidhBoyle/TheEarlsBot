const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const Config = require('./config.js');

const ChatBot = function (){
	this.message = null
	this.channel = null
};

const CONFIGUREOPTIONS = 'Config: options-set';
const RESPONSE = '*: ready response to Twitch'
const BASIC = 'ChatBot: chat message to get to know streamer/bot'
const SOCIAL = 'ChatBot: chat message to be repled by social media links'
const SHOUTOUT = 'ChatBot: chat message to link out to other twitch streamer'

ChatBot.prototype.bindChatBot = function () {


	PubSub.subscribe(CONFIGUREOPTIONS, (msg, data) => {
		const options = new Options(data.username, data.password, data.channel);

		client = new tmi.Client(options);

		this.channel = data.channel

		client.connect();

		client.on('chat', (channel, user, message, self) => {

			this.message = message

			this.handler();

		});

		client.on('connected', (address, port) => {


			client.action(`${this.channel}`, 'Hello everyone. SoapBot is here and ready cure what ails ya');
		});

	});




	PubSub.subscribe(RESPONSE, (msg, data) => {
		client.action(`${this.channel}`, `${data}`);

	});






	ChatBot.prototype.handler = function () {

		if (this.message.includes(`!welcome`) || this.message.includes('!soapbot') || this.message.includes('!royalitysoap') || this.message.includes('!rs')) {
			PubSub.publish(BASIC, this.message);
		}
		else if (this.message.includes(`!discord`) || this.message.includes(`!twitter`) || this.message.includes(`!facebook`) || this.message.includes(`!fb`) || this.message.includes(`!instagram`) || this.message.includes(`!insta`) || this.message.includes(`!youtube`) || this.message.includes(`!yt`) || this.message.includes('!social')||  this.message.includes('!rssocial')) {
			PubSub.publish(SOCIAL, this.message);
		}
		else if (this.message.includes(`!so`)){
			PubSub.publish(SHOUTOUT, this.message);
		}
	};

};



module.exports = ChatBot;
