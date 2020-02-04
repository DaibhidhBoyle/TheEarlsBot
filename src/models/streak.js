const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const storage = require('node-persist');

const Streak = function (){
  this.response = null
  this.count = null
};

const STREAK = 'ChatBot: chat message to be replied to by how days in a row the stream has streamed';
const RESPONSE = '*: ready response to Twitch';

Streak.prototype.bindStreak = function () {

  storage.initSync();
//fake
// let pseudo = new Date();
// pseudo.setHours(0,0,0,0);
// pseudo.setDate(pseudo.getDate() - 1);
// storage.setItemSync(`${pseudo}`, 3);
// end

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


  PubSub.subscribe(STREAK, (msg, data) => {

    PubSub.publish(RESPONSE, this.count);
  });
};

module.exports = Streak;
