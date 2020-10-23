const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
const prompt = require("prompt-async");
var pluralize = require('pluralize')
const random = require('../helpers/random.js');
const strip = require('../helpers/strip.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('counterDb.json')
const db = low(adapter)


const Counter = function (){
  this.message = null;
  this.response = null;

};

Counter.prototype.bindCounter = function () {

  db.defaults({ lastUsedCommand: '', counter: {}})
  .write()

  PubSub.subscribe(pschannel.newcounter, async (msg, data) => {

    this.message = data

    this.message = this.message.replace('!new','').trim();

    let counterTitle = await this.getTitleFromMessage(this.message);

    if (counterTitle === undefined){
      this.response = `Please mark your new counter title with a !. eg !deaths`
    }
    else {

      isPlural = pluralize.isPlural(counterTitle);

      if (isPlural === false){
        counterTitle = pluralize(counterTitle);
      }

      let counterCommand = await this.getCommandFromTitle(counterTitle);

      let number = strip.getNum(this.message);

      if (counterTitle != undefined){
        if(number === ''){
          db.set(`counter.${counterTitle}`, {command: counterCommand, count: 0 })
          .write()
        }
        else {
          db.set(`counter.${counterTitle}`, {command: counterCommand, count: number })
          .write()
        }

        this.setLastUsedCommand(counterCommand);

        this.response = await this.setResponse(counterTitle);
      }
    }

    PubSub.publish(pschannel.response, this.response);
  });







  PubSub.subscribe(pschannel.deletecounter, async (msg, data) => {

    this.message = data

    this.message = this.message.replace('!delete','').trim();

    let counterTitle = await this.getTitleFromMessage(this.message);

    isPlural = pluralize.isPlural(counterTitle);

    if (isPlural === false){
      counterTitle = pluralize(counterTitle);
    }

    let allCounters = db.get('counter')
    .value()

    let allCountersMinusTarget = {}

    for (var property in allCounters) {
      if (property !== counterTitle) {
        allCountersMinusTarget[property] = allCounters[property]
      }
    }

    db.set(`counter`, allCountersMinusTarget)
    .write()

    this.response = `The counter for ${counterTitle} has been removed from the record`

    PubSub.publish(pschannel.response, this.response);
  });




  PubSub.subscribe(pschannel.count, async (msg, data) => {

    this.message = data

    let title = this.getTitleFromMessage(data);
    title = this.makePlural(title);
    this.response = await this.setResponse(title);

    PubSub.publish(pschannel.response, this.response);
  });
};


















Counter.prototype.setResponse = async function (title) {



  count = await this.getCount(title);

  if (count === '1'){
    title = pluralize.singular(title);
  }

  return `There has been ${count} ${title} so far!`

}

Counter.prototype.setLastUsedCommand = function (command) {

  db.set('lastUsedCommand', `${command}`)
  .write()

}

Counter.prototype.getTitleFromMessage = function (str) {

  var exclamation = str.indexOf(`!`);
  if(exclamation !== -1){
    let flaggedWordCut = str.slice(exclamation);
    var nextSpace = flaggedWordCut.indexOf(` `);
    if (nextSpace === -1){
      let word = flaggedWordCut.slice(1);
      return word
    } else {
      let word = flaggedWordCut.slice(1, nextSpace);
      return word
    }
  }
  else {
    return undefined
  }

}

Counter.prototype.getCommandFromTitle = function (title) {

  title = this.makeSingular(title);

  return `!` + title

}

Counter.prototype.getCount = function (counterTitle){
  counterTitle = this.makePlural(counterTitle)

  let count = db.get(`counter.${counterTitle}.count`)
  .value()

  return count
}

Counter.prototype.makePlural = function (title){
  isPlural = pluralize.isPlural(title)

  if (isPlural === false){
    title = pluralize(title)
  }

  return title


}

Counter.prototype.makeSingular = function (title){
  isSingular = pluralize.isSingular(title)

  if (isSingular === false){
    title = pluralize.singular(title)
  }

  return title


}

module.exports = Counter;
