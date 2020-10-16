const PubSub = require('pubsub-js');
const ChatBot = require('./chatBot.js');
const pschannel = require('../helpers/pubsubchannels');

const Config = function () {
  this.username = null;
  this.password = null;
  this.channel = null;
};


Config.prototype.bindConfig = function () {
    const config = new Config();
    config.username = 'TheSudsBot'
    config.password = 'oauth:1o5yuowrdtck6x9u1vch3i2uogc2mi'
    config.channel = 'dai101'
      PubSub.publish(pschannel.configureoptions, config);
  };


module.exports = Config;
