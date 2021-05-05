const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');

const Social = require('../models/social.js')
const social = new Social();


const Timed = function (){
  this.response = null;
  this.repeatResponse = null;
  this.message = null
  this.random = null;
  this.selector = null;
};

Timed.prototype.bindTimed = function () {

  PubSub.subscribe(pschannel.timedset, (msg, data) => {

    this.response = ' '

    this.message = data

    this.message = this.message.replace('!timed','').trim();

    this.repeatResponse = this.message

    console.log(this.repeatResponse);

    this.response = 'Timed response set to' + ' ' + this.repeatResponse

    PubSub.publish(pschannel.response, this.response);

  });

  PubSub.subscribe(pschannel.timed, async (msg, data) => {

    this.response = ' '

    console.log(this.repeatResponse);

    if (this.repeatResponse !== null){
      this.response = this.repeatResponse
    } else {
      this.selector = random.getNum(10);
      this.random = random.getNum(3);

        switch (this.selector){
          case 4:
          this.response = await social.randomPo(this.random)
          break;
          case 5:
          this.response = await social.randomInsta(this.random)
          break;
          case 6:
          this.response = await social.randomTwitter(this.random)
          break;
          case 7:
          this.response = `Subs! Join us on Discord ( discord.gg/vPhEzMbYfj ) for a Movie Night every Sunday at 6pm CT. Remember to connect your Discord to your Twitch using the Connections tab so you can be part of the fun!`
          break;
          case 8:
          this.response = `Remember if you have Amazon Prime you can connect it to Prime Gaming here on Twitch ( gaming.amazon.com ) to subscribe to your favorite streamer for free! Give them those Bezos Bucks`
          break;
          case 9:
          this.response = `Donations are not needed but are very apprciated. Donate at https://streamelements.com/theearlofsuds/tip`
          break;
          default:
          this.response = await social.randomDiscord(this.random);

      }
    }

    PubSub.publish(pschannel.responseNoAt, this.response);

    });

  };

module.exports = Timed;
