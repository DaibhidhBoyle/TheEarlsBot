const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const Config = require('./config.js');

const ChatBot = function (){
	this.message = null
	this.response = null
	this.channel = null
};

const CONFIGUREOPTIONS = 'ChatBot: configure-options';
const OPTIONSCONFIGURED = 'Config: options-set';
const HANDLER = 'ChatBot: organise chat messages';
const RESPONSE = '*: ready response to Twitch'

ChatBot.prototype.bindChatBot = function () {


	PubSub.subscribe(OPTIONSCONFIGURED, (msg, data) => {
		const options = new Options(data.username, data.password, data.channel);

		client = new tmi.Client(options);

		this.channel = data.channel

		client.connect();

		client.on('chat', (channel, user, message, self) => {

			PubSub.publish(HANDLER, message);



		});

		client.on('connected', (address, port) => {

			client.action(`${data.channel}`, 'Hello everyone. SoapBot is here and ready cure what ails ya');
		});

	});

	PubSub.subscribe(RESPONSE, (msg, data) => {
		client.action(`${this.channel}`, `${data.response}`);

	});
};



module.exports = ChatBot;
