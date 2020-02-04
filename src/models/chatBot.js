const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const pschannels = require('../helpers/pschannels');

const ChatBot = function (){
	this.message = null
	this.channel = null
	this.user = null
};


ChatBot.prototype.bindChatBot = function () {


	PubSub.subscribe(pschannels.configureoptions, (msg, data) => {
		const options = new Options(data.username, data.password, data.channel);

		client = new tmi.Client(options);

		this.channel = data.channel

		client.connect();

		client.on('chat', (channel, user, message, self) => {

			this.user = user
			this.message = message.toLowerCase();

			this.handler();

		});

		client.on('connected', (address, port) => {


			client.action(`${this.channel}`, 'Hello everyone. SoapBot is here and ready cure what ails ya');
		});

	});




	PubSub.subscribe(pschannels.response, (msg, data) => {
		client.action(`${this.channel}`, `${data}`);
	});

	PubSub.subscribe(pschannels.modonlyreponse, (msg, data) => {
		if (this.user[`user-type`] === 'mod'){
			client.action(`${this.channel}`, `${data}`);
	} else {
			client.action(`${this.channel}`, `Sorry ${this.user[`display-name`]}, that's a mod only action`);
	}
	});




	ChatBot.prototype.handler = function () {

		if (this.message.includes(`!welcome`) || this.message.includes('!soapbot') || this.message.includes('!royalitysoap') || this.message.includes('!rs')) {
			PubSub.publish(pschannels.basic, this.message);
		}
		else if (this.message.includes(`!discord`) || this.message.includes(`!twitter`) || this.message.includes(`!facebook`) || this.message.includes(`!fb`) || this.message.includes(`!instagram`) || this.message.includes(`!insta`) || this.message.includes(`!youtube`) || this.message.includes(`!yt`) || this.message.includes('!social')||  this.message.includes('!rssocial')) {
			PubSub.publish(pschannels.social, this.message);
		}
		else if (this.message.includes(`!shoutout`) ||this.message.includes(`!so`)){
			PubSub.publish(pschannels.shoutout, this.message);
		} else if (this.message.includes(`!streak`)){
			PubSub.publish(pschannels.streak, this.message);
		}
	};

};



module.exports = ChatBot;
