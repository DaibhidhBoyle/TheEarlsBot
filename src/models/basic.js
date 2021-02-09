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
    else if(this.message.includes('!royaltysoaps') || data.includes('!rs')){
      this.response = `Kenny and his family work to make luxury, hand-crafted soaps and invites you be part of the process through high quality crafting videos. Find out more at https://www.royaltysoaps.com/ or get a look at those 'making of' videos at youtube.com/royaltysoaps`
    }
    else if(this.message.includes('!when') || data.includes('!schedule')){
      this.response = `Catch the stream 4pm CT everyday (cept sunday)! and  special early Sunday stream at 1pm CT. Keep up to date on any schedule changes at the discord: discord.gg/HDk9fn2uXS`
    }
    else if(this.message.includes('!movie') || data.includes('!mn')){
      this.response = `Subs! Join us on Discord ( discord.gg/vPhEzMbYfj ) for a Movie Night every Sunday at 6pm CT. Remember to connect your Discord to your Twitch using the Connections tab so you can be part of the fun!`
    }
    else if(this.message.includes('!donate')){
      this.response = `Donations are not needed but are very apprciated. Donate at https://streamelements.com/theearlofsuds/tip`
    }
    else if(this.message.includes('!prime')){
      this.response = `Remember if you have Amazon Prime you can connect it Prime Gaming here on Twitch ( gaming.amazon.com ) to subscribe to your favorite streamer for free! Give them those Bezos Bucks`
    }
    else if(this.message.includes('!command')){
      this.response = `See all the trick I can do at http://bit.ly/ecomand`
    }
    else if(this.message.includes('!modcommand')){
      this.response = `Aye aye Captain! bit.ly/ecomdsmod`
    }


    PubSub.publish(pschannel.responseNoAt, this.response);

  });
};

module.exports = Basic;
