const tmi = require('tmi.js');
const PubSub = require('pubsub-js');

const Basic = function (){
  this.response = null
};

const FIRST = 'ChatBot: chat message to get to know bot'
const RESPONSE = '*: ready response to Twitch'

Basic.prototype.bindBasic = function () {
    PubSub.subscribe(FIRST, (msg, data) => {

    if (data.includes('!soapbot')) {
      this.response = `I am SoapBot; a bot here to help with whatever you need. Nice to meet you! If you want to have a look at kenny's soaps try typing '!Soap' into the chat. Or to find out more about our chat team competition type '!Team`
          PubSub.publish(RESPONSE, this.response);
    };
  });
};

module.exports = Basic;
