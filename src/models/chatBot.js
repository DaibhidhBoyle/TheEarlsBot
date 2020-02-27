const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const pschannel = require('../helpers/pubsubchannels');


const ChatBot = function (){
	this.message = null;
	this.channel = null;
	this.user = null;
};


ChatBot.prototype.bindChatBot = function () {

	PubSub.subscribe(pschannel.configureoptions, (msg, data) => {

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


			client.action(`${this.channel}`, 'Hello everyone. The Suds Bot is here and ready help with whatever you need');
		});

	});





	PubSub.subscribe(pschannel.response, (msg, data) => {
		client.action(`${this.channel}`, `@${this.user[`display-name`]}` + ` ` + `${data}`);
	});

	PubSub.subscribe(pschannel.modonlyresponse, (msg, data) => {
		let badges = Object.keys(this.user[`badges`])
		let level = badges.includes('moderator') || badges.includes('broadcaster')
		if (level === true){
			client.action(`${this.channel}`, `${data}`);
		} else {
			client.action(`${this.channel}`, `Sorry ${this.user[`display-name`]}, that's a mod only action`);
		}
	});




	ChatBot.prototype.handler = function () {

		if (this.message.includes(`!discord`) || this.message.includes(`!twitter`) || this.message.includes(`!facebook`) || this.message.includes(`!fb`) || this.message.includes(`!instagram`) || this.message.includes(`!insta`) || this.message.includes(`!youtube`) || this.message.includes(`!yt`) || this.message.includes('!social')||  this.message.includes('!rssocial')) {
			PubSub.publish(pschannel.social, this.message);
		}
		else if (this.message.includes(`!welcome`) || this.message.includes('!sudsbot') || this.message.includes('!royalitysoap') || this.message.includes('!rs') || this.message.includes('!when')|| this.message.includes('!schedule')) {
			PubSub.publish(pschannel.basic, this.message);
		}
		else if (this.message.includes('!soap')){
			PubSub.publish(pschannel.soap, this.message);
		}
		else if (this.message.includes(`!shoutout`) ||this.message.includes(`!so`)){
			PubSub.publish(pschannel.shoutout, this.message);
		}
		else if (this.message.includes(`!streak`)){
			PubSub.publish(pschannel.streak, ' ');
		}
		else if (this.message.includes(`good bot`) || this.message.includes(`bad bot`) ||this.message.includes(`@thesudsbot`)){
			PubSub.publish(pschannel.bot, this.message);
		}
	};

};



module.exports = ChatBot;
