const tmi = require('tmi.js');
const PubSub = require('pubsub-js');

const Handler = function () {
};

const HANDLER = 'ChatBot: organise chat messages';
const RESPONSE = '*: ready response to Twitch'

Handler.prototype.bindHandler = function () {
  PubSub.subscribe(HANDLER, (msg, data) => {
    let response = null
    let message = data.toLowerCase();
    if (message.includes('!soapbot')) {
      response = `I am SoapBot; a bot here to help with whatever you need. Nice to meet you! If you want to have a look at kenny's soaps try typing '!Soap' into the chat. Or to find out more about our chat team competition type '!Team'.`
      PubSub.publish(RESPONSE, response);
    };
  });
};

module.exports = Handler;
