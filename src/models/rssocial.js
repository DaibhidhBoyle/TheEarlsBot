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



    if (this.message.includes(`!facebook`) || this.message.includes('!fb')) {
      this.response = await this.RandomFb(this.random);
    }

    else if (this.message.includes('!rssocial')) {
      this.response = `Kenny's family is a soap making empire. Catch them at : Instagram -   bit.ly/2uRox1V Twitter -  bit.ly/2QAZI33 Facebook -  bit.ly/2QFB5lE Youtube - youtube.com/royaltysoaps`
    };

    PubSub.publish(pschannel.response, this.response);

  });
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




};


module.exports = RsSocial;
