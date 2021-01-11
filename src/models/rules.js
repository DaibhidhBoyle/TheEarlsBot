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

    if (this.message.includes('!clean')){
      this.response = `CLEAN CHAT ONLY!  If I can talk clean you can type clean >:3`
    }
    else if (this.message.includes(`!bully`)){
      this.response = ` No bullying / homophobia / hate towards religion & personal beliefs `
    }
    else if (this.message.includes(`!flirt`)){
      this.response = `No  e x c e s s i v e  f l i r t i n g  p l z`
    }
    else if (this.message.includes(`!link`)){
      this.response = `No links in chat. Save them for the discord`
    }
    else if (this.message.includes(`!spam`)){
      this.response = `No spamming (unless it's emotes then go wild :) )`
    }
    else if (this.message.includes(`!promote`)){
      this.response = `Dont self promote, that's not cool`
    }
    else if (this.message.includes(`!hammer`)){
      this.response = `Respect the mods or get the hammer`
    }
    else if(this.message.includes('!rules')){
      this.response = `1. CLEAN CHAT ONLY!  If I can talk clean you can type clean BOP 2. No bullying / homophobia / hate towards religion & personal beliefs BOP 3. No  excessive  flirting BOP 4. Save links for the discord BOP 5. Spam emotes, not words BOP 6. Dont self promote, thats not cool BOP 7. Respect my mods or get the hammer`
    };

    PubSub.publish(pschannel.responseNoAt, this.response);

  });
};

module.exports = Rules;
