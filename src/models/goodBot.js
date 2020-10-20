const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');

const GoodBot = function (){
  this.response = null;
  this.message = null;

  this.random = null;
};

GoodBot.prototype.bindGoodBot = function () {

  PubSub.subscribe(pschannel.bot, (msg, data) => {

    this.response = ' '
    this.message = data.trim();

    this.random = random.getNum(3);

    if(this.message === 'good bot') {
      this.randomGood();
    }
    else if (this.message === 'bad bot') {
      this.response = `Sorry, I'm a young bot and still make mistakes. :( If you find any issues with my functionality please whisper dai101 here on twitch and he'll try to get that patched up`
    }
    else if (this.message.includes('@thesudsbot')) {
      this.randomNotice();
    };

    PubSub.publish(pschannel.response, this.response);
  });
};

GoodBot.prototype.randomGood = function () {
  if (this.random === 0){
    this.response = 'That warms the cogs of my little bot heart :) thank you for your feed back'
  }
  else if (this.random === 1){
    this.response = `Aww shucks. You'll make me blush. Thank you for your feed back`
  }
  else if (this.random === 2){
    this.response = `Thank you for your feedback. I'll keep trying my hardest`
  }
}

GoodBot.prototype.randomNotice = function () {
  if (this.random === 0){
    this.response = `Let me know if there's anything I can do to make your time visiting the channel more pleasant`
  }
  else if (this.random === 1){
    this.response = 'Here and at your service!'
  }
  else if (this.random === 2){
    this.response = `How can I help you today?`
  }
}

module.exports = GoodBot;
