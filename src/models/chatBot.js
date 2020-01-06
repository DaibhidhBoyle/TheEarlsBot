const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const Config = require('./config.js');

const ChatBot = function (){
	this.message = null
	this.response = null
};

const CONFIGUREOPTIONS = 'ChatBot: configure-options';
const OPTIONSCONFIGURED = 'Config: options-set';

ChatBot.prototype.bindChatBot = function () {
	PubSub.subscribe(OPTIONSCONFIGURED, (msg, data) => {
		const options = new Options(data.username, data.password, data.channel);

		const client = new tmi.Client(options);

		client.connect();

		client.on('connected', (address, port) => {

			client.action('TheEarlsBot', 'hello!');

		});

	});


};



module.exports = ChatBot;
