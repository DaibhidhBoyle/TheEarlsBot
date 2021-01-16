const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');


const Social = function (){
  this.response = null;
  this.message = null
  this.random = null;
};




Social.prototype.bindSocial = function () {

  PubSub.subscribe(pschannel.social, async (msg, data) => {
    this.response = ' '

    this.random = random.getNum(3);

    this.message = data

    if (this.message.includes('!discord')) {
      this.response = await this.randomDiscord(this.random);
    }

    else if (this.message.includes('!instagram') || this.message.includes('!insta')) {
      this.response = await this.randomInsta(this.random);
    }

    else if (this.message.includes(`!youtube`) || this.message.includes(`!yt`)){
      this.response = await this.randomYt(this.random);
    }

    else if (this.message.includes('!po')) {
      this.response = await this.randomPo(this.random);
    }

    else if (this.message.includes('!social')) {
      this.response = await this.randomSocial(this.random);
    };

    PubSub.publish(pschannel.response, this.response);

  });
};

Social.prototype.randomDiscord = function (random) {

  if(random === 0){
    return `Can't get enough of the Earl and the chat? Join us on discord at discord.gg/HDk9fn2uXS The vibes are quality!`;
  }
  else if (random === 1){
    return `Need more positivity in your life? Join the community on discord at discord.gg/HDk9fn2uXS`;
  }
  else if (random === 2){
    return `You bring the chat and I'll bring the chips. Meet you on the discord at discord.gg/HDk9fn2uXS`;
  };
};

Social.prototype.randomInsta = function (random) {
  if(random === 0){
    return `Want more of Kenny's face? Get it at bit.ly/theearlofsuds`
  }
  else if(random === 1){
    return `Forget streamer! Kenny's born to be a model at  bit.ly/theearlofsuds`
  }
  else if(random === 2){
    return `Don't believe Kenny has legs? Get proof here bit.ly/theearlofsuds `
  }

};

Social.prototype.randomYt = function (random) {
  if(random === 0){
    return `Get to know Kenny more at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }
  else if(random === 1){
    return `See more of Kenny's shenanigans at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }
  else if(random === 2){
    return `Get a closer look at the man behind the title at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }

};

Social.prototype.randomPo = function (random) {
  if(random === 0){
    return `Wanna give Kenny a little gift, he'd love that! Send it to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll pass it along to him`;
  }
  else if(random === 1){
    return `Kenny doesn't have his own PO box, but he knows people. Send your mail to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll get it to him.`;
  }
  else if(random === 2){
    return `Wanna send Kenny fan mail? He's used it, gets it all the time, he promises. Send it to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll read it to him- kenny is too popular to do his own reading`;
  }

};

Social.prototype.randomSocial = function (random) {
  if(random === 0){
    return `Only seeing Kenny on Twitch not enough? Get more at Instagram - bit.ly/theearlofsuds and Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community Discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(random === 1){
    return `Weeby, Nerdy and occasionally Beardy! Oh My! Get more at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA and Discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(random === 2){
    return `Get your Kenny fix at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community Discord - https://discordapp.com/invite/PmK33d4`;
  }

};


module.exports = Social;
