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
    config.username = '***'
    config.password = '***'
    config.channel = '***'
      PubSub.publish(pschannel.configureoptions, config);
  };


module.exports = Config;
