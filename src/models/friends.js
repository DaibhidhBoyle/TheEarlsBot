const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const Friend = function (){
  this.response = null;
  this.message = null
};

Friend.prototype.bindFriend = function () {

  PubSub.subscribe(pschannel.friend, (msg, data) => {

    this.message = data

    if (this.message.includes('!fc') || this.message.includes('!friendcode')|| this.message.includes(`!switch`)) {
      this.response = `Be the Earl's friend on the switch with the code SW-5903_4709-9098. He'll accept your request as soon as possible!`
    }

    else if (this.message.includes(`!playstaion`) || this.message.includes(`!ps`)){
      this.response = `Add Smobuchin on playstaion to play along side the Earl! `
    };

    PubSub.publish(pschannel.response, this.response);

  });
};

module.exports = Friend;
