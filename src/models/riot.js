const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const random = require('../helpers/random.js');
const pschannel = require('../helpers/pubsubchannels');

const Riot = function (){
  this.response = null
  this.user = null
  this.rioters = []

  this.random = null
};



Riot.prototype.bindRiot = function () {
  PubSub.subscribe(pschannel.riot, async (msg, data) => {
    this.response = ' '
    this.user = data

    if(this.rioters.indexOf(this.user) === -1) {
    this.rioters.push(this.user);
    console.log(this.user);
}

    console.log('riot count =' + ' ' + this.rioters.length);

    if(this.rioters.length === 2){
      this.random = random.getNum(3);

      this.response = await this.randomRiot(this.random);
      this.rioters = []

      PubSub.publish(pschannel.responseNoAt, this.response);
    }

  });

  Riot.prototype.randomRiot = function (random) {


    if(random === 0){
      return `Kenny White! The chat has declared you have commit a great injustice! They demand you atone for your sin!`;
    }
    else if (random === 1){
      return `Kenny sits in his ivory tower looking down on us, making his bad decisions. No more! WE RIOT!`
    }
    else if (random === 2){
      return `Kenny the pretend streamer has pushed the chat to far! We demand the return of the one true rightful streamer. GIVE US GARRETT!`;
    };
  };
};

module.exports = Riot;
