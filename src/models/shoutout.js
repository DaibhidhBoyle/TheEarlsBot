const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');

var TinyURL = require('tinyurl');


const Shoutout = function (){
  this.response = null;
  this.message = null;
  this.list = null;

  this.shoutoutList = [];
  this.random = null;
  this.counter = 0
  this.messageRemaining = null;
  this.additionalText = null;

};


Shoutout.prototype.bindShoutout = function () {
  PubSub.subscribe(pschannel.shoutout, async (msg, data) => {


    this.response = ' '
    this.message = data.trim();

    if (this.message === '!so'){

      this.response = `Looks like your trying to shout someone out but you haven't said who. If you want to shout someone out be sure to @ them`;

      PubSub.publish(pschannel.response, this.response);

    } else {
      this.shoutoutList = [];


      while (this.message !== null){
        this.slicemessage(this.message);
        this.message = this.messageRemaining;
      };

      let arrayLength = this.shoutoutList.length;

      if (arrayLength > 0){
        this.response = `Don't let your fun on twitch end with The Earl! There are other great channels; `
        while (this.counter < arrayLength){
          if (this.counter > 0 ) {
            this.response = this.response + ' ' + 'Or'
          }
          this.random = random.getNum(10);
          this.additionalText =  await this.channelMessage(this.random)
          this.response = this.response + ` ` + this.additionalText
          this.counter ++
        }
      }
      else {
        this.response = `Looks like your trying to shout someone out but you haven't said who. If you want to shout someone out be sure to @ them`
      }

      this.shoutoutList = [];
      this.random = null;
      this.counter = 0
      this.additionalText = null;

      PubSub.publish(pschannel.responseNoAt, this.response);
    };
  });



  Shoutout.prototype.slicemessage = function (str) {



    var at = str.indexOf(`@`);
    if(at !== -1){
      var afterAt = at + 1
      var wordAfterAt = str.slice(afterAt);
      var nextSpace = wordAfterAt.indexOf(` `);
      if (nextSpace === -1){
        if (this.shoutoutList.indexOf(wordAfterAt) === -1) this.shoutoutList.push(wordAfterAt);
        this.messageRemaining = null
      } else {
        endTag = afterAt + nextSpace
        let taggedName = str.slice(afterAt, endTag)
        if (this.shoutoutList.indexOf(taggedName) === -1) this.shoutoutList.push(taggedName);
        this.messageRemaining = str.slice(endTag);
      }
    }
    else {
      this.messageRemaining = null
    }

  };

  Shoutout.prototype.channelMessage = async function (random) {
    let capitalName = await this.capitalise(this.shoutoutList[this.counter])
    let channelName = this.shoutoutList[this.counter]
    switch (random) {
      case 0:
      return `checkout ${capitalName} at www.twitch.tv/${channelName}`;
      break;
      case 1:
      return `jump in on the fun with ${capitalName} by clicking www.twitch.tv/${channelName}`;
      break;
      case 2:
      return `watch ${capitalName} over at www.twitch.tv/${channelName}`;
      break;
      case 3:
      return `catch ${capitalName}'s stream on www.twitch.tv/${channelName}`;
      break;
      case 4:
      return `join ${capitalName} at their channel www.twitch.tv/${channelName}`;
      break;
      case 5:
      return `take a look at ${capitalName} over on www.twitch.tv/${channelName}`;
      break;
      case 6:
      return `try ${capitalName} out over at www.twitch.tv/${channelName}`;
      break;
      case 7:
      return `party with ${capitalName} over on www.twitch.tv/${channelName}`;
      break;
      case 8:
      return`spend some quality time with ${capitalName} here - www.twitch.tv/${channelName}`;
      break;
      case 9:
      return `give ${capitalName} some love at www.twitch.tv/${channelName}`;
      break;
    }
  }

  Shoutout.prototype.capitalise = function (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
};





module.exports = Shoutout;
