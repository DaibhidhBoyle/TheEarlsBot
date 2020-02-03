const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const storage = require('node-persist');

const Streak = function (){
};

const STREAK = 'ChatBot: chat message to be replied to by how days in a row the stream has streamed';
const RESPONSE = '*: ready response to Twitch';

Streak.prototype.bindStreak = function () {
  storage.initSync();
    PubSub.subscribe(STREAK, (msg, data) => {
      storage.setItemSync('name','dai');
      name = storage.getItemSync('name');
      PubSub.publish(RESPONSE, name);
    });
  };

module.exports = Streak;
