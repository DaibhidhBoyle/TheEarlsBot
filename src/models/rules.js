const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const Rules = function (){
  this.response = null;
  this.message = null
};

Rules.prototype.bindRules = function () {

  PubSub.subscribe(pschannel.rules, (msg, data) => {

    this.message = data

    if (this.message.includes('!clean'))
      this.response = `CLEAN CHAT ONLY!  If I can talk clean you can type clean >:3`
    }

    else if (this.message.includes(`!bully`)){
      this.response = ` No bullying / homophobia / hate towards religion & personal beliefs `
    };

    else if (this.message.includes(`!flirt`)){
      this.response = `No  e x c e s s i v e  f l i r t i n g  p l z`
    };

    else if (this.message.includes(`!hammer`)){
      this.response = `Respect the mods or get the hammer`
    };

    PubSub.publish(pschannel.modonlyresponse, this.response);

  });
};

module.exports = Rules;
