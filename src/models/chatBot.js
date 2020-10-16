const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const pschannel = require('../helpers/pubsubchannels');
const permissions = require('../helpers/checkPermissions.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('counterDb.json')
const db = low(adapter)


const ChatBot = function (){
	this.message = null;
	this.channel = null;
	this.user = null;

	this.counter = [];
};


ChatBot.prototype.bindChatBot = function () {

	PubSub.subscribe(pschannel.configureoptions, (msg, data) => {

		this.counterCreation();

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
		client.color("channel", "CadetBlue");
		client.action(`${this.channel}`, `@${this.user[`display-name`]}` + ` ` + `${data}`);
	});

	PubSub.subscribe(pschannel.responseNoAt, (msg, data) => {
		client.color("channel", "CadetBlue");
		client.action(`${this.channel}`, `${data}`);
	});

	PubSub.subscribe(pschannel.responseriot, (msg, data) => {
		client.color("channel", "Red");
		client.action(`${this.channel}`, `@${this.user[`display-name`]}` + ` ` + `${data}`);
	});

	PubSub.subscribe(pschannel.modonly, (msg, data) => {
		client.color("channel", "CadetBlue");
		client.action(`${this.channel}`, `Sorry `+ ` ` +` @${this.user[`display-name`]}` + ` ` + `that's a mod only command :(`);
	});

	ChatBot.prototype.handler = async function () {
		//beard
		if (this.message.includes(`!beard`)){
			PubSub.publish(pschannel.beard, this.message);
		}
		//social
		else if (this.message.includes(`!discord`) || this.message.includes(`!instagram`) || this.message.includes(`!insta`) || this.message.includes(`!youtube`) || this.message.includes(`!yt`) || this.message.includes('!social') || this.message.includes(`!po`) ) {
			PubSub.publish(pschannel.social, this.message);
		}
		//rssocial
		else if (this.message.includes(`!twitter`) || this.message.includes(`!facebook`) || this.message.includes(`!fb`) || this.message.includes('!rssocial') ) {
			PubSub.publish(pschannel.rssocial, this.message);
		}
		// basic
		else if (this.message.includes(`!welcome`)  || this.message.includes('!royalitysoap') || this.message.includes('!rs') || this.message.includes('!schedule') || this.message.includes('!when') || this.message.includes('!movie') || this.message.includes('!mn')) {
			PubSub.publish(pschannel.basic, this.message);
		}
		// friends
		else if (this.message.includes(`!friendcode`)  || this.message.includes('!fc') || this.message.includes('!switch') || this.message.includes('!playstation') ||this.message.includes(`!ps`)){
			PubSub.publish(pschannel.friend, this.message);
		}
		//riot
		else if (this.message.includes(`!riot`)){
			PubSub.publish(pschannel.riot, this.user.username);
		}
		//cry
		else if (this.message.includes(`!cry`)){
			PubSub.publish(pschannel.cry, this.message);
		}
		else if (this.message.includes(`!tear`)){
			let modStatus = await permissions.checkIfMod(this.user)
			this.levelHandler(pschannel.tear, pschannel.modonly, modStatus, this.message)
		}
		//rules
		else if (this.message.includes(`!clean`)  || this.message.includes('!bully') || this.message.includes('!flirt') || this.message.includes('!link') || this.message.includes('!spam')|| this.message.includes('!promote') || this.message.includes('!hammer') || this.message.includes(`!rules`)){
			PubSub.publish(pschannel.rules, this.message);
		}
		// soap
		else if (this.message.includes('!soap')){
			PubSub.publish(pschannel.soap, this.message);
		}
		//shoutout
		else if (this.message.includes(`!shoutout`) ||this.message.includes(`!so`)){
			let modStatus = await permissions.checkIfMod(this.user)
			this.levelHandler(pschannel.shoutout, pschannel.modonly, modStatus, this.message)
		}
		//streak
		else if (this.message.includes(`!streak`)){
			let streamerStatus = await permissions.checkIfStreamer(this.user)
			this.levelHandler(pschannel.streakset, pschannel.streak, streamerStatus, this.message)
		}
		//goodBot
		else if (this.message === `good bot` || this.message === `bad bot` || this.message.includes(`@thesudsbot`)){
			PubSub.publish(pschannel.bot, this.message);
		}
		//counters
		else if (this.counter.includes(this.message))
	};

	ChatBot.prototype.levelHandler = function (targetChannel1, targetChannel2, level, message) {
		if (level === true){
			PubSub.publish(targetChannel1, message);
		} else {
			PubSub.publish(targetChannel2, message);
		}
	}

	ChatBot.prototype.counterCreation = function () {
		db.defaults({ counters: {count: 0}})
		.write()


		counters =	db.get('counters')
		.value()

		for (const counter in counters) {
			this.counter.push(`!` + counter)
		}

	}
};



module.exports = ChatBot;
