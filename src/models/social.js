const tmi = require('tmi.js');
const PubSub = require('pubsub-js');

const Social = function (){
  this.response = null
};

const SOCIAL = 'ChatBot: chat message to be by social.js'
const RESPONSE = '*: ready response to Twitch'



Social.prototype.bindSocial = function () {
  PubSub.subscribe(SOCIAL, (msg, data) => {

    let message = data

    if (message.includes('!discord')) {
      this.response = `Can't get enough of the Earl and the chat? Join the community at https://discordapp.com/invite/PmK33d4 There's a bunch of pet pics `;
    }
    else if (message.includes('!social')) {
      this.reponse = `Only seeing Kenny on Twitch not enough. Get more at Instagram - http://bit.ly/theearlofsuds Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`
    }
    else if (message.includes('!rssocial')) {
      this.response = `Kenny is making soap all over the internet. Catch him at : Instagram -  http://bit.ly/2uRox1V Twitter - http://bit.ly/2QAZI33 Facebook - http://bit.ly/2QFB5lE Youtube - youtube.com/royaltysoaps Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`
    }
    else if (message.includes('!instagram') || message.includes('!insta')) {
      this.response = `Wanna more of Kenny's face? Get it at http://bit.ly/theearlofsuds Or maybe you're more intrested in the soap he makes? Try http://bit.ly/2uRox1V `;
    }
    else if (message.includes(`!youtube`) || message.includes(`!yt`)){
      this.response = `See how The Earl of Suds got his name at youtube.com/royaltysoaps or get a bit more personal with Kenny's channel https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA`;
    }
    else if (message.includes('!twitter')) {
      this.response = `Catch your bitesized soap updates at http://bit.ly/2QAZI33 ... that's poorly worded. please don't eat soap.`;
    }
    else if (message.includes(`!faceboook`) || message.includes('!fb')) {
      this.response = `Sick of your timelines doom and gloom. Clean up that feed by adding some soap http://bit.ly/2QFB5lE`;
    };
    PubSub.publish(RESPONSE, this.response);
  });
};

module.exports = Social;
