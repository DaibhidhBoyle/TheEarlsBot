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

  PubSub.subscribe(pschannel.social, (msg, data) => {

    this.random = random.getNum(3);

    this.message = data

    if (this.message.includes('!discord')) {
      this.randomDiscord();
    }

    else if (this.message.includes('!instagram') || this.message.includes('!insta')) {
      this.randomInsta();
    }

    else if (this.message.includes(`!youtube`) || this.message.includes(`!yt`)){
      this.randomYt();
    }

    else if (this.message.includes('!twitter')) {
      this.randomTwitter();
    }

    else if (this.message.includes(`!facebook`) || this.message.includes('!fb')) {
      this.RandomFb();
    }

    else if (this.message.includes('!po')) {
      this.randomPo();
    }

    else if (this.message.includes('!social')) {
      this.randomSocial();
    }



    else if (this.message.includes('!rssocial')) {
      this.response = `Kenny's family is a soap making empire. Catch them at : Instagram -   bit.ly/2uRox1V Twitter -  bit.ly/2QAZI33 Facebook -  bit.ly/2QFB5lE Youtube - youtube.com/royaltysoaps`
    };

    PubSub.publish(pschannel.response, this.response);

  });
};

Social.prototype.randomDiscord = function () {

  if(this.random === 0){
    this.response = `Can't get enough of the Earl and the chat? Join us on discord at discordapp.com/invite/PmK33d4 There's a bunch of pet pics `;
  }
  else if (this.random === 1){
    this.response = `Need more positivity in your life? Join the community on discord at discordapp.com/invite/PmK33d4`;
  }
  else if (this.random === 2){
    this.response = `You bring the chat and I'll bring the chips. Meet you on the discord at discordapp.com/invite/PmK33d4`;
  };
};

Social.prototype.randomInsta = function () {
  if(this.random === 0){
    this.response = `Wanna more of Kenny's face? Get it at bit.ly/theearlofsuds`
  }
  else if(this.random === 1){
    this.response = `Forget streamer! Kenny's born to be a model at  bit.ly/theearlofsuds`
  }
  else if(this.random === 2){
    this.response = `Don't believe Kenny has legs? Get proof here bit.ly/theearlofsuds `
  }

};

Social.prototype.randomYt = function () {
  if(this.random === 0){
    this.response = `Get to know Kenny more at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }
  else if(this.random === 1){
    this.response = `See more of Kenny's shenanigans at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }
  else if(this.random === 2){
    this.response = `Get a closer look at the man behind the title at www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }

};

Social.prototype.randomTwitter = function () {
  if(this.random === 0){
    this.response = `Catch your bite sized soap updates at bit.ly/2QAZI33 ... that's poorly worded. Please don't eat soap`;
  }
  else if(this.random === 1){
    this.response = `Slide some soap into your twitter feed at bit.ly/2QAZI33`;
  }
  else if(this.random === 2){
    this.response = `Royalty Soaps has a long running twitter feud with boring bath times. Follow the drama at bit.ly/2QAZI33`;
  }

};

Social.prototype.RandomFb = function () {
  if(this.random === 0){
    this.response = `Sick of your timeline's doom and gloom. Clean up that feed by adding some soap bit.ly/2QFB5lE`;
  }
  else if(this.random === 1){
    this.response = `Need more soap in your life?  bit.ly/2QFB5lE has got you covered`;
  }
  else if(this.random === 2){
    this.response = `See the royal court and their soap on your facebook at bit.ly/2QFB5lE`;
  }

};

Social.prototype.randomPo = function () {
  if(this.random === 0){
    this.response = `Wanna give Kenny a little gift, he'd love that! Send it to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll pass it along to him`;
  }
  else if(this.random === 1){
    this.response = `Kenny doesn't have his own PO box, but royality soaps does. Send your mail to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll get it to him.`;
  }
  else if(this.random === 2){
    this.response = `Wanna send Kenny fan mail? He's used it, get it all the time, he promises. Send it to Kenny White, P.O. Box 1025, Terrell, Texas, 75160. They'll read it to him- kenny is too popular to do his own reading`;
  }

};

Social.prototype.randomSocial = function () {
  if(this.random === 0){
    this.response = `Only seeing Kenny on Twitch not enough? Get more at Instagram - bit.ly/theearlofsuds and Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(this.random === 1){
    this.response = `Weeby, Nerdy and occasionally Beardy! Oh My! Get more at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA and Discord - https://discordapp.com/invite/PmK33d4`;
  }
  else if(this.random === 2){
    this.response = `Get your Kenny fix at Instagram -  bit.ly/theearlofsuds , Youtube - www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`;
  }

};


module.exports = Social;
