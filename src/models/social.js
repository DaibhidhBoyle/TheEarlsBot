const tmi = require('tmi.js');
const PubSub = require('pubsub-js');

const Social = function (){
  this.response = null
  this.random = null
};

const SOCIAL = 'ChatBot: chat message to be by social.js'
const RESPONSE = '*: ready response to Twitch'



Social.prototype.bindSocial = function () {

  PubSub.subscribe(SOCIAL, (msg, data) => {

    this.rerandom();

    let message = data

    if (message.includes('!discord')) {
      this.randomDiscord();
    }

    else if (message.includes('!instagram') || message.includes('!insta')) {
      this.randomInsta();
    }
    else if (message.includes(`!youtube`) || message.includes(`!yt`)){
      this.randomYt();
    }
    else if (message.includes('!twitter')) {
      this.randomTwitter();
    }
    else if (message.includes(`!facebook`) || message.includes('!fb')) {
      this.RandomFb();
    }
    else if (message.includes('!social')) {
      this.randomSocial();
    }
    else if (message.includes('!rssocial')) {
      this.response = `Kenny is making soap all over the internet. Catch him at : Instagram -  http://bit.ly/2uRox1V Twitter - http://bit.ly/2QAZI33 Facebook - http://bit.ly/2QFB5lE Youtube - youtube.com/royaltysoaps Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`
    };

    PubSub.publish(RESPONSE, this.response);
  });
};

Social.prototype.rerandom = function () {
  this.random = Math.floor(Math.random() * 3);
};

Social.prototype.randomDiscord = function () {

  if(this.random === 0){
    this.response = `Can't get enough of the Earl and the chat? Join us at https://discordapp.com/invite/PmK33d4 There's a bunch of pet pics `;
  }
  else if (this.random === 1){
    this.response = `Need more positivity in your life? Join the community at https://discordapp.com/invite/PmK33d4`;
  }
  else if (this.random === 2){
    this.response = `You bring the chat and I'll bring the chips. Meet you at https://discordapp.com/invite/PmK33d4`;
  };
};

Social.prototype.randomInsta = function () {
  if(this.random === 0){
    this.response = `Wanna more of Kenny's face? Get it at http://bit.ly/theearlofsuds Or maybe you're more intrested in the soap he makes? Try http://bit.ly/2uRox1V`
  }
  else if(this.random === 1){
    this.response = `Forget streamer! Kennys born to be a model at http://bit.ly/theearlofsuds Or checkout his day job making soap at http://bit.ly/2uRox1V`
  }
  else if(this.random === 2){
    this.response = `Don't believe Kenny has legs? Get photo evidence at http://bit.ly/theearlofsuds Don't believe Kenny makes soap? Proof here http://bit.ly/2uRox1V but maybe work on your trust issues`
  }

};

Social.prototype.randomYt = function () {
  if(this.random === 0){
    this.response = `See how The Earl of Suds got his name at youtube.com/royaltysoaps or get a bit more personal with Kenny's channel https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }
  else if(this.random === 1){
    this.response = `Score some soap secrets at youtube.com/royaltysoaps or see Kenny's solo shanaganes at https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }
  else if(this.random === 2){
    this.response = `See the Earl cooking up a sudsy batch of soap at youtube.com/royaltysoaps or get a closer look at the man behind the title at https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
  }

};

Social.prototype.randomTwitter = function () {
  if(this.random === 0){
    this.response = `Catch your bitesized soap updates at http://bit.ly/2QAZI33 ... that's poorly worded. Please don't eat soap`;
  }
  else if(this.random === 1){
    this.response = `Slide some soap into your twitter feed at http://bit.ly/2QAZI33`;
  }
  else if(this.random === 2){
    this.response = `Royality Soaps has a long running twitter feud with boring bath times. Follow the drama at http://bit.ly/2QAZI33`;
  }

};

Social.prototype.RandomFb = function () {
  if(this.random === 0){
    this.response = `Sick of your timeline's doom and gloom. Clean up that feed by adding some soap http://bit.ly/2QFB5lE`;
  }
  else if(this.random === 1){
    this.response = `Need more soap in your life? http://bit.ly/2QFB5lE has got you covered`;
  }
  else if(this.random === 2){
    this.response = `See the royal court and their soap on your facebook at http://bit.ly/2QFB5lE. `;
  }

};

Social.prototype.randomSocial = function () {
  if(this.random === 0){
    this.response = `Only seeing Kenny on Twitch not enough? Get more at Instagram - http://bit.ly/theearlofsuds and Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }
  else if(this.random === 1){
    this.response = `Weeby, Nerdy and Beardy! Oh My! Get more at Instagram - http://bit.ly/theearlofsuds and Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }
  else if(this.random === 2){
    this.response = `Get your Kenny fix at Instagram - http://bit.ly/theearlofsuds and Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
  }

};


module.exports = Social;
