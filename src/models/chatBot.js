const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const Options = require('./options.js');
const Config = require('./config.js');

const ChatBot = function (){
	this.message = null
  this.response = null
	};

const CONFIGUREOPTIONS = 'ChatBot: configure-options';

  ChatBot.prototype.bindChatBot = function () {
    const options = new Options();
    PubSub.publish(CONFIGUREOPTIONS, options);
		};


// const client = new tmi.Client(options);
//
// client.connect();
//
//
//
// client.on('connected', (address, port) => {
//   client.action(, 'Hello')
// });


module.exports = ChatBot;
