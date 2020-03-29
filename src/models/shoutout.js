const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');

var TinyURL = require('tinyurl');
var Promise = require('promise');


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

    var end = await this.fetch();
    console.log(end);

    this.response = ' '
    this.message = data.trim();

    if (this.message === '!so'){

      this.response = `Looks like your trying to shout someone out but you haven't said who. If you want to shout someone out be sure to @ them`;

      PubSub.publish(pschannel.modonlyresponse, this.response);

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
          this.channelMessage()
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

      PubSub.publish(pschannel.modonlyresponse, this.response);
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

  Shoutout.prototype.fetch = async function () {
    var games = await api.get('https://api.twitch.tv/helix/games/top')
    var result = await games.data
    return result

  }
  Shoutout.prototype.channelMessage = function () {
    switch (this.random) {
      case 0:
      this.additionalText = `checkout ${this.shoutoutList[this.counter]} at www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 1:
      this.additionalText = `jump in on the fun with ${this.shoutoutList[this.counter]} by clicking www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 2:
      this.additionalText = `watch ${this.shoutoutList[this.counter]} over at www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 3:
      this.additionalText = `catch ${this.shoutoutList[this.counter]}'s stream on www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 4:
      this.additionalText = `join ${this.shoutoutList[this.counter]} at their channel www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 5:
      this.additionalText = `take a look at ${this.shoutoutList[this.counter]} over on www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 6:
      this.additionalText = `try ${this.shoutoutList[this.counter]} out over at www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 7:
      this.additionalText = `party with ${this.shoutoutList[this.counter]} over on www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 8:
      this.additionalText = `spend some quality time with ${this.shoutoutList[this.counter]} here - www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
      case 9:
      this.additionalText = `give ${this.shoutoutList[this.counter]} some love at www.twitch.tv/${this.shoutoutList[this.counter]}`;
      break;
    }
  }

};





module.exports = Shoutout;
