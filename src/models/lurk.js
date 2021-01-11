const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
const random = require('../helpers/random.js');
const capitalise = require('../helpers/capitalise.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('lurkDb.json')
const db = low(adapter)


const Lurk = function (){
  this.user = null;
  this.response = null;

  this.random = null;
};

Lurk.prototype.bindLurk = function () {

  db.defaults({ lurk: '-1'})
  .write()

  PubSub.subscribe(pschannel.lurk, async (msg, data) => {

    this.user = capitalise.capital(data)

    this.random = random.getNum(5);

    db.update(`lurk`, n => `${Number(n) + 1}`)
    .write()

    let count = db.get(`lurk`)
    .value()

    if (count === '0'){
      this.response = this.user + ' ' + 'has started to lurk. See you soon!'
    }
    else if (count === '1'){
      this.response = this.user + ' ' + 'is watching on lurk mode with 1 friend. They will be back later'
    }
    else {
      this.response = await this.setResponse(this.random, count)
    }

    PubSub.publish(pschannel.responseNoAt, this.response);
  });

}

Lurk.prototype.setResponse = function (random, count) {

  if (random === 0){
    return this.user + ' ' + 'is lurking; watching on tearfully from a distance' + ' ' + count + ' ' + 'others'
  }
  else if (random === 1){
    return this.user + ' ' + 'has a busy life and needs to get stuff done. They have joined' + ' ' + count + ' ' + ' others in lurking'
  }
  else if (random === 2){
    return this.user + ' ' + 'has started to lurk along side' + ' ' + count + ' ' + 'friends'
  }
  else if (random ===3 ){
    return this.user + ' ' + 'has started to lurk with' + ' ' + count + ' ' + 'of our friends. Hope to see you soon.'
  }
  else if (random ===4 ){
    return this.user + ' ' + 'is chilling on lurk with ' + ' ' + count + ' ' + 'others. We love lurkers! :)'
  }

}

module.exports = Lurk;
