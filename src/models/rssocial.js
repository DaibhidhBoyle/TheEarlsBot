const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');


const RsSocial = function (){
  this.response = null;
  this.message = null
  this.random = null;
};




RsSocial.prototype.bindRsSocial = function () {

  PubSub.subscribe(pschannel.rssocial, async (msg, data) => {

    this.response = ' '
    this.random = random.getNum(3);

    this.message = data

    if (this.message.includes('!twitter')) {
      this.response = await this.randomTwitter(this.random);
    }

    else if (this.message.includes(`!facebook`) || this.message.includes('!fb')) {
      this.response = await this.RandomFb(this.random);
    }

    else if (this.message.includes('!rssocial')) {
      this.response = `Kenny's family is a soap making empire. Catch them at : Instagram -   bit.ly/2uRox1V Twitter -  bit.ly/2QAZI33 Facebook -  bit.ly/2QFB5lE Youtube - youtube.com/royaltysoaps`
    };

    PubSub.publish(pschannel.response, this.response);

  });
};


RsSocial.prototype.randomTwitter = function (random) {
  if(random === 0){
    return `Kenny doesn't have twitter but Royalty Soaps does! Catch your bite sized soap updates at bit.ly/2QAZI33 ... that's poorly worded. Please don't eat soap`;
  }
  else if(random === 1){
    return `Kenny doesn't have twitter but Royalty Soaps does! Slide some soap into your twitter feed at bit.ly/2QAZI33`;
  }
  else if(random === 2){
    return `Kenny doesn't have twitter but Royalty Soaps does! They have a long running twitter feud with boring bath times. Follow the drama at bit.ly/2QAZI33`;
  }

};

RsSocial.prototype.RandomFb = function (random) {
  if(random === 0){
    return `Kenny doesn't have facebook group but Royalty Soaps does! Sick of your timeline's doom and gloom. Clean up that feed by adding some soap bit.ly/2QFB5lE`;
  }
  else if(random === 1){
    return `Kenny doesn't believe in facebook but Royality Soaps does.  bit.ly/2QFB5lE has got you covered`;
  }
  else if(random === 2){
    return `Kenny is too cool for facebook but Royality Soaps has it. See them and their soap on your facebook at bit.ly/2QFB5lE`;
  }

};


RsSocial.prototype.randomSocial = function (random) {
  if(random === 0){
    return `Only seeing Kenny on Twitch not enough? Get more at Instagram - bit.ly/theearlofsuds and Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(random === 1){
    return `Weeby, Nerdy and occasionally Beardy! Oh My! Get more at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA and Discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(random === 2){
    return `Get your Kenny fix at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`;
  }

};


module.exports = RsSocial;
