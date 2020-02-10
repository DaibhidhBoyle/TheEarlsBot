const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const storage = require('node-persist');
const pschannel = require('../helpers/pubsubchannels');

const Streak = function (){
  this.response = null;
  this.count = null;

    this.num1 = null;
    this.num2 = null;
    this.num3 = null;
    this.num4 = null;

    this.str1 = null;
    this.str2 = null;
    this.str3 = null;
};

Streak.prototype.bindStreak = function () {

  storage.initSync();

  let today = new Date();
  today.setHours(0,0,0,0);
  let yesterday = new Date();
  yesterday.setHours(0,0,0,0);
  yesterday.setDate(yesterday.getDate() - 1);
  let record = storage.getItemSync(`${yesterday}`)
  if(record !== undefined){
    record ++
    storage.removeItemSync(`${yesterday}`);
    storage.setItemSync(`${today}`, record);
    this.count = storage.getItemSync(`${today}`)
  } else {
    storage.forEach(function(key, value) {
      storage.removeItemSync(`${key}`);
    });
    storage.setItemSync(`${today}`, 1);
    this.count = storage.getItemSync(`${today}`)

  }


  PubSub.subscribe(pschannel.streak, (msg, data) => {
    if(this.count === 1){
      this.response = `Kenny is just starting a new streak! This is day 1`;
    }
    else if (this.count === 2 || this.count === 3){
      this.response = `We're just getting started. Current streak is ${this.count} days!`;
    }
    else if (this.count >= 4 && this.count <7){
      this.response = `Things are heating up! Kennys streak is ${this.count} days in a row`;
    }
    else if (this.count === 7){
      this.response = `Wow! The Earls has streamed every day for a week straight!`;
    }
    else if (this.count >= 8 && this.count <14){
      this.response = `Kenny current streaming streak is a blazing ${this.count} days in a row!`;
    }
    else if (this.count === 14){
      this.response = `Good Golly! Kenny has streamed every day for a fortnight!`;
    }
    else if (this.count >= 14 && this.count < 25){
      this.response = `The Earl's on a hot streak; he's streamed for a mighty ${this.count} days in a row!`;
    }
    else if (this.count >= 25){
      this.response = `Hot Dang! The Earl of Suds has streamed everyday for ${this.count} days! Now that's impressive.`;
    }else {
      this.response = `error` + ` ` + `${this.count}`
    }

    PubSub.publish(pschannel.response, this.response);
  });
};

module.exports = Streak;
