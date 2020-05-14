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
    else if(this.message.includes('!royalitysoap') || data.includes('!rs')){
      this.response = `Kenny and his family work to make luxury, hand-crafted soaps and invites you be part of the process through high quality crafting videos. Find out more at https://www.royaltysoaps.com/ or get a look at those 'making of' videos at youtube.com/royaltysoaps`
    }
    else if(this.message.includes('!when') || data.includes('!schedule')){
      this.response = `Catch the stream 6pm CST everyday! Keep up to date on any schedule changes at the discord: discordapp.com/invite/PmK33d4`
    }
    else if(this.message.includes('!rules')){
      this.response = `1. CLEAN CHAT ONLY!  If I can talk clean you can type clean | 2. No bullying / homophobia / hate towards religion & personal beliefs | 3. No  excessive  flirting | 4. Respect my mods or get the hammer`
    };


    PubSub.publish(pschannel.response, this.response);

  });
};

module.exports = Basic;
