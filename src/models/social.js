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

    }
    else if (message.includes(`!faceboook`) || message.includes('!fb')) {
      this.response = `Sick of your timelines doom and gloom. Clean up that feed by adding some soap http://bit.ly/2QFB5lE`;
    }
    else if (message.includes('!social')) {
      this.reponse = `Only seeing Kenny on Twitch not enough. Get more at Instagram - http://bit.ly/theearlofsuds Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
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
    this.reponse = `Forget streamer! Kennys born to be a model at http://bit.ly/theearlofsuds Or checkout his day job making soap at http://bit.ly/2uRox1V`
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
    this.response = `See the Earl helping cook up a sudsy batch of soap at youtube.com/royaltysoaps or get a closer look at the `
  }

};

Social.prototype.randomTwitter = function () {
  if(this.random === 0){
    this.response = `Catch your bitesized soap updates at http://bit.ly/2QAZI33 ... that's poorly worded. please don't eat soap.`;
  }
  else if(this.random === 1){
    this.response = `Slide some soap into your twitter feed at  http://bit.ly/2QAZI33`;
  }
  else if(this.random === 2){
    this.response = ``;
  }

};

Social.prototype. = function () {
  if(this.random === 0){

  }
  else if(this.random === 1){

  }
  else if(this.random === 2){

  }

};

Social.prototype. = function () {
  if(this.random === 0){

  }
  else if(this.random === 1){

  }
  else if(this.random === 2){

  }

};

Social.prototype. = function () {
  if(this.random === 0){

  }
  else if(this.random === 1){

  }
  else if(this.random === 2){

  }

};

module.exports = Social;
