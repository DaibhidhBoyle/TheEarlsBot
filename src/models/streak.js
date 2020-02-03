const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const storage = require('node-persist');

const Streak = function (){
  this.response = null
};

const STREAK = 'ChatBot: chat message to be replied to by how days in a row the stream has streamed';
const RESPONSE = '*: ready response to Twitch';

Streak.prototype.bindStreak = function () {

  storage.initSync();
  let pseudodate = new Date(new Date().setDate(new Date().getDate()-1));
  pseudodate.setHours(0,0,0,0);
  storage.setItemSync(`${pseudodate}`, `2`)

    PubSub.subscribe(STREAK, (msg, data) => {
      let yesterday = new Date();
      yesterday.setHours(0,0,0,0);
      yesterday.setDate(data.getDate() - 1);

      let record = storage.getItemSync(`${yesterday}`)
      // if (current.date === data.getDate() - 1){
      //   count = current.counter + 1
      //   storage.removeItemSync('current')
      //   storage.setItemSync(`current`, `{date: ${data}, counter: ${count}}`)
      //   answer = storage.getItemSync(`current.counter`)
      //   this.reponse = `Kenny is on a roll with a current streak of ${answer} days!`
      // } else {
      //   storage.removeItemSync('current')
      //   storage.setItemSync(`current`, `{date: ${data}, counter: 1}`)
      //   this.reponse = `Kenny is starting a brand new streak, it's day 1`
      // }
      PubSub.publish(RESPONSE, record);
    });
  };

module.exports = Streak;
