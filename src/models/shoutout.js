const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannels = require('../helpers/pschannels');


const Shoutout = function (){
  this.response = null;
  this.shoutoutList = [];
  this.message = null
  this.test = `start`

  this.num1 = null
  this.num2 = null
  this.num3 = null
  this.num4 = null

  this.str1 = null
  this.str2 = null

};


Shoutout.prototype.bindShoutout = function () {

  PubSub.subscribe(pschannels.shoutout, (msg, data) => {

    this.message = data

    if (this.message === '!so'){

      this.response = `Looks like your trying to shout someone out but you haven't said who. If you want to shout someone out be sure to @ them`;

      PubSub.publish(pschannels.modonlyreponse, this.response);
    } else {
      this.shoutoutList = [];

      let counter = 0



      while (counter < 3){
        this.slicemessage(this.message);
        this.test = this.test + ` ` + `${counter}`
        this.message = this.str3;
        counter++
      };

      let arrayLength = this.shoutoutList.length;

      if(arrayLength === 1){
        this.response = `Looking for a new stream to follow? Try    *** www.twitch.tv/${this.shoutoutList[0]} ***`
      } else if (arrayLength === 2) {
        this.response = `They're some great streamers out there! Checkout  *** www.twitch.tv/${this.shoutoutList[0]} ***  or  *** www.twitch.tv/${this.shoutoutList[1]} ***`
      } else if (arrayLength === 3) {
        this.response = `Don't let your time on twitch end when the the Earl of Suds logs out. Checkout out more great streamers like *** www.twitch.tv/${this.shoutoutList[0]} *** or  *** www.twitch.tv/${this.shoutoutList[1]} *** or  *** www.twitch.tv/${this.shoutoutList[2]} ***`
      } else {
        this.response = `Looks like your trying to shout someone out but you haven't said who. If you want to shout someone out be sure to @ them`
      };

      PubSub.publish(pschannels.modonlyreponse, this.response);
    };

  });



  Shoutout.prototype.slicemessage = function (str) {

    this.num1 = str.indexOf(`@`);
    if(this.num1 !== -1){
      this.num2 = this.num1 + 1
      this.str1 = str.slice(this.num2);
      this.num3 = this.str1.indexOf(` `);
      if (this.num3 === -1){
        this.test = this.test + ` ` + this.str1
        this.shoutoutList.push(this.str1);
        this.str3 = " "
      } else {
        this.num4 = this.num2 + this.num3
        this.str2 = str.slice(this.num2, this.num4)
        this.shoutoutList.push(this.str2);
        this.test = this.test + ` ` + this.str2
        this.str3 = str.slice(this.num4);
      }

    };
  };

};

module.exports = Shoutout;
