const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const Basic = function (){
  this.response = null
  this.message = null
};



Basic.prototype.bindBasic = function () {
  PubSub.subscribe(pschannel.basic, (msg, data) => {
    this.response = ' '
    this.message = data

    if (this.message.includes(`!welcome`)){
      this.response = 'Welcome to the Earl of Suds twitch channel. The Earl is Kenny White, a Texan gamer dedicated to great gameplay, engaging with his community and being a wholesome bean. Please make yourself at home and get friendly in chat. '
    }
    else if (this.message.includes('!sudsbot')) {
      this.response = `I am The Suds Bot; a chatbot here to help with whatever you need. Nice to meet you! I have a bunch of neat commands, Try using !soap find new soap or !streak to find out how many days in a row the Earl has been on twitch.`

    }
    else if(this.message.includes('!royalitysoap') || data.includes('!rs')){
      this.response = `Kenny works along side his family to make luxury, hand-crafted soaps and invites you be part of the process through high quality crafting videos. Find out more at https://www.royaltysoaps.com/ or get a look at those 'making of' videos at youtube.com/royaltysoaps`
    }
    else if(this.message.includes('!when') || data.includes('!schedule')){
      this.response = `Catch the stream 8pm CST on Wednesdays, Fridays, Saturdays and Sundays!`
    };

    PubSub.publish(pschannel.response, this.response);

  });
};

module.exports = Basic;
