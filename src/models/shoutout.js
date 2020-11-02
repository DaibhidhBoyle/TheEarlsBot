const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
var TinyURL = require('tinyurl');
const random = require('../helpers/random.js');
const capitalise = require('../helpers/capitalise.js');
const pschannel = require('../helpers/pubsubchannels');

require('dotenv').config();

const Twitch = require("twitch.tv-api");
const twitch = new Twitch({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
});




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

  PubSub.subscribe(pschannel.shoutout, async (msg, data, data2) => {

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

      if (arrayLength > 1){
        this.response = `Don't let your fun on twitch end with The Earl!`
        while (this.counter < arrayLength){
          let channelName = this.shoutoutList[this.counter]
          let capitalName = await capitalise.capital(channelName)
          if (this.counter > 0 ) {
            this.response = this.response + ' ' + 'Or'
          }
          this.random = random.getNum(10);
          this.additionalText =  await this.channelMessage(this.random, channelName, capitalName)
          this.response = this.response + ` ` + this.additionalText
          this.counter ++
        }
      }
      else if (arrayLength === 1){
        let channelName = this.shoutoutList[0]
        let capitalName = await capitalise.capital(channelName)
        this.response = `Don't let your fun on twitch end with The Earl!`
        this.random = random.getNum(10);
        this.additionalText =  await this.channelMessage(this.random, channelName, capitalName)
        this.response = this.response + ` ` + this.additionalText
        let gameLastPlayed = await this.GetLastGame(channelName);
        if (gameLastPlayed !== ''){
          this.response = this.response + ' ' + 'They were last streaming' + ' ' + gameLastPlayed
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

  Shoutout.prototype.channelMessage = async function (random, capitalName, channelName) {
    switch (random) {
      case 0:
      return `Checkout ${capitalName} at www.twitch.tv/${channelName}`;
      break;
      case 1:
      return `Jump in on the fun with ${capitalName} by clicking www.twitch.tv/${channelName}`;
      break;
      case 2:
      return `Watch ${capitalName} over at www.twitch.tv/${channelName}`;
      break;
      case 3:
      return `Catch ${capitalName}'s stream on www.twitch.tv/${channelName}`;
      break;
      case 4:
      return `Join ${capitalName} at their channel www.twitch.tv/${channelName}`;
      break;
      case 5:
      return `Take a look at ${capitalName} over on www.twitch.tv/${channelName}`;
      break;
      case 6:
      return `Try ${capitalName} out over at www.twitch.tv/${channelName}`;
      break;
      case 7:
      return `Party with ${capitalName} over on www.twitch.tv/${channelName}`;
      break;
      case 8:
      return`Spend some quality time with ${capitalName} here - www.twitch.tv/${channelName}`;
      break;
      case 9:
      return `Give ${capitalName} some love at www.twitch.tv/${channelName}`;
      break;
    }
  }

  Shoutout.prototype.GetLastGame = async function (channel) {
    let data = await twitch.searchChannels(channel)
    return data['channels'][0]['game']
  };

};





module.exports = Shoutout;
