const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const strip = require('../helpers/strip.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('streakDb.json')
const db = low(adapter)


const Streak = function (){
  this.message = null;
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

  db.defaults({ streak: {date: {}, count: 0 }})
  .write()

  let today = new Date();
  today.setHours(0,0,0,0);
  let yesterday = new Date();
  yesterday.setHours(0,0,0,0);
  yesterday.setDate(yesterday.getDate() - 1);

  let lastDateinDb = db.get('streak.date')
  .value()

  if(lastDateinDb == yesterday){
    console.log('streak: one added to streak! well done lad!');
    db.set('streak.date', `${today}`)
    .write()
    db.update('streak.count', n => n + 1)
    .write()
  } else if (lastDateinDb == today){
    console.log('streak: Going again today! jump on it lad!');
  }else {
    console.log('streak: starting again. lets get this done lad!');
    db.set('streak.date', `${today}`)
    .write()
    db.set('streak.count', 0)
    .write()
  }



  PubSub.subscribe(pschannel.streak, async (msg, data) => {
    this.response = ' '
    this.response = await this.getMessage();
    PubSub.publish(pschannel.response, this.response);
  });

  PubSub.subscribe(pschannel.streakset, async (msg, data) => {
    this.response = ' '
    this.message = data.trim();
    this.message = await strip.getNum(this.message)
    if (this.message != ''){
      newCount = Number(this.message)
      db.set('streak.count', newCount)
      .write()
    }
    this.response = await this.getResponse();
    PubSub.publish(pschannel.response, this.response);
  });

  Streak.prototype.getResponse = function () {
    this.count = db.get('streak.count')
    .value()

    if(this.count === 1){
      return `Kenny is just starting a new streak! This is day 1`;
    }
    else if (this.count === 2 || this.count == 3){
      return `We're just getting started. Current streak is ${this.count} days streaming!`;
    }
    else if (this.count >= 4 && this.count <7){
      return `Things are heating up! Kennys streak is ${this.count} days streaming in a row`;
    }
    else if (this.count === 7){
      return `Wow! The Earls has streamed every day for a week straight!`;
    }
    else if (this.count >= 8 && this.count <14){
      return `Kenny current streaming streak is a blazing ${this.count} days in a row!`;
    }
    else if (this.count === 14){
      return `Good Golly! Kenny has streamed every day for a fortnight!`;
    }
    else if (this.count >= 14 && this.count < 25){
      return `Kenny's been going for ${this.count} days! Now that's what I call a hot streak`;
    }
    else if (this.count >= 25 && this.count <30){
      return `Hot Dang! The Earl of Suds has streamed every day for ${this.count} days! Now that's impressive.`;
    }
    else if (this.count === 30 || this.count === 31){
      return `Going strong for ${this.count} days! Thats a whole month of fun!.`;
    }
    else if (this.count >= 32 && this.count <45){
      return `The Earl's on a hot streak; he's streamed for a mighty ${this.count} days in a row!`;
    }
    else if (this.count >= 45 && this.count <61){
      return `Kenny has streamed for ${this.count} days in a row. He's always here now, always here for you`;
    }
    else if (this.count === 61){
      return `Two whole months of your boy Kenny! And he's not stopping there`;
    }
    else if (this.count === 69){
      return `The Earl's has streamed ${this.count} days in a row! nice`;
    }
    else if (this.count >= 62 && this.count <90){
      return `This streak is on fire! ${this.count} days and counting!`;
    }
    else if (this.count >= 90 && this.count <120){
      return `${this.count} days! This streak is too hot!`;
    }
    else if (this.count >= 120 && this.count <183){
      return `${this.count} days! This man cares not for sleep, only his streak `;
    }
    else if (this.count === 183){
      return `Half a year of The Earl on your screen! Here's to the next half!`;
    }
    else if (this.count >= 184 && this.count <245){
      return `Earl's been going for ${this.count} days! This streak is burning up, it must have a fever. A streamer fever`;
    }
    else if (this.count >= 245 && this.count <300){
      return `A white hot streak of ${this.count} days streaming in a row! Get it? WHITE hot, like really hot and kenny's last name... it's a pun`;
    }
    else if (this.count >= 300 && this.count <365){
      return `The Earl has streamed ${this.count} days in a row! That a streak hotter than the sun!`;
    }
    else if (this.count === 365){
      return `Our lad has streamed every day for a year straight! I'm so proud! Happy Anniversary Kenny!`;
    }
    else if (this.count >= 366){
      return `Kenny's streamed for ${this.count} days in a row. Now that's just showing off`;
    }
    else {
      return `There's been a small problem tracking this streak. Please message da101 here on twitch and he'll get that sorted asap. Sorry for the  inconvenience`
    }

  }


};

module.exports = Streak;
