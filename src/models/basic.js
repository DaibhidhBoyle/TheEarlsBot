const tmi = require('tmi.js');
const PubSub = require('pubsub-js');

const Basic = function (){
  this.response = null
};

const BASIC = 'ChatBot: chat message to get to know bot'
const RESPONSE = '*: ready response to Twitch'

Basic.prototype.bindBasic = function () {
    PubSub.subscribe(BASIC, (msg, data) => {

      let message = data

    if (message.includes(`!welcome`)){
      this.response = 'Welcome to the Earl of Suds twitch channel. The Earl is Kenny White, a Texan gamer dedicated to great gameplay, engaging with his community and being a wholesome bean. Please make yourself at home and get friendly in chat. '
    }
    else if (message.includes('!soapbot')) {
      this.response = `I am SoapBot; a bot here to help with whatever you need. Nice to meet you! *add some instructions here*`

    }
    else if(message.includes('!royalitysoaps') || data.includes('!rs')){
      this.response = 'Kenny works along side his family to make luxury, hand-crafted soaps and let you be part of the process through high quality crafting videos. Find out more at https://www.royaltysoaps.com/ or get a glimpse of the making at youtube.com/royaltysoaps '
    };
    PubSub.publish(RESPONSE, this.response);
  });
};

module.exports = Basic;
