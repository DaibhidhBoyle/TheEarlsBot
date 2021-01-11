const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const pschannel = require('../helpers/pubsubchannels');
const permissions = require('../helpers/checkPermissions.js');
const merge = require ('merge');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('counterDb.json')
const db = low(adapter)


const ChatBot = function (){
	this.message = null;
	this.channel = null;
	this.user = null;

	this.counter = {};

};


ChatBot.prototype.bindChatBot = async function () {

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

		ChatBot.prototype.handler = async () => {
			//beard
			if (this.message.includes(`!beard`)){
				PubSub.publish(pschannel.beard, this.message);
			}
			//social
			else if (this.message.includes(`!discord`) || this.message.includes(`!instagram`) || this.message.includes(`!insta`) || this.message.includes(`!youtube`) || this.message.includes(`!yt`) || this.message.includes('!social') || this.message === `!po` ){
				PubSub.publish(pschannel.social, this.message);
			}
			//rssocial
			else if (this.message.includes(`!twitter`) || this.message.includes(`!facebook`) || this.message.includes(`!fb`) || this.message.includes('!rssocial') ) {
				PubSub.publish(pschannel.rssocial, this.message);
			}
			// basic
			else if (this.message.includes(`!welcome`)  || this.message.includes('!royaltysoaps') || this.message.includes('!rs') || this.message.includes('!schedule') || this.message.includes('!when') || this.message.includes('!movie') || this.message.includes('!mn') || this.message.includes('!donate') || this.message.includes('!command') || this.message.includes('!modcommand')) {
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
			else if (this.message.includes(`!shoutout`) ||this.message.includes(`!so`)&& !this.message.includes('!song') && !this.message.includes('!soap')){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.shoutout, pschannel.modonly, modStatus, this.message)
			}
			//streak
			else if (this.message.includes(`!streak`)){
				let streamerStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.streakset, pschannel.streak, streamerStatus, this.message)
			}
			//speed
			else if(this.message.includes('!speed')){
				let dataToSend = {message: this.message, channel: this.channel};
				PubSub.publish(pschannel.speed, dataToSend);
			}
			//lurk
			else if (this.message.includes(`!lurk`)){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.lurk, pschannel.modonly, modStatus, this.user[`display-name`])
			}
			//goodBot
			else if (this.message === `good bot` || this.message === `bad bot` || this.message.includes(`@thesudsbot`)){
				PubSub.publish(pschannel.bot, this.message);
			}
			// //counters
			else if (this.message.includes(`!newcount`)){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.newcounter, pschannel.modonly, modStatus, this.message)
			}
			else if (this.message.includes(`!deletecount`) || this.message.includes(`!delcount`)){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.deletecounter, pschannel.modonly, modStatus, this.message)
			}
			else if (this.message.includes(`!add`) || this.message.includes(`!+`)){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.quickadd, pschannel.modonly, modStatus, this.message)
			}
			else if (this.message.includes(`!subtract`) || this.message.includes(`!-`)){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.quicksubtract, pschannel.modonly, modStatus, this.message)
			}
			else if (this.message.includes('!allcount')){
				let modStatus = await permissions.checkIfMod(this.user)
				this.levelHandler(pschannel.allcounters, pschannel.modonly, modStatus, this.message)
			}
			else if (this.message.includes('!')){
				this.counter = await this.counterCreation();
				console.log(this.counter)
				for (let command in this.counter){
					if (this.message.includes('!' + command) || this.message.includes(this.counter[command].command)){
						let dataToSend = {message: this.message, command: command}
						let modStatus = await permissions.checkIfMod(this.user)
						this.levelHandler(pschannel.countmod, pschannel.count, modStatus, dataToSend)
					}
				}
			}


		};

		ChatBot.prototype.levelHandler = function (targetChannel1, targetChannel2, level, message) {
			if (level === true){
				PubSub.publish(targetChannel1, message);
			} else {
				PubSub.publish(targetChannel2, message);
			}
		}

		ChatBot.prototype.counterCreation = function () {

			console.log('here')
			return	db.get('counter')
			.value()

		}

		PubSub.subscribe(pschannel.updateCountersList, async (msg, data) => {

			this.counter = merge.recursive(this.counter, data)
		});
	};



	module.exports = ChatBot;
