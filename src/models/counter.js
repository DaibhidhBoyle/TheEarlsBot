const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
const prompt = require("prompt-async");
const random = require('../helpers/random.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('counterDb.json')
const db = low(adapter)


const Counter = function (){
  this.response = null;
  this.date = null;

  this.random = null;
};

Cry.prototype.bindCry = function () {

  db.defaults({ cry: {date: undefined}})
  .write()

  PubSub.subscribe(pschannel.cry, async (msg, data) => {


  });

  PubSub.subscribe(pschannel.tear, async (msg, data) => {

    this.message = data

    this.message = this.message.replace('!tears','').trim();
    this.message = this.message.replace('!tear','').trim();

    if (this.message === ''){
      let date = new Date();
      date.setHours(0,0,0,0);
      let formatted_date = await formatdate.format(date);
      db.set('cry.date', `${formatted_date}`)
      .write()
    }
    else {
      db.set('cry.date', `${this.message}`)
      .write()
    }

    this.response = await this.getResponse()

    PubSub.publish(pschannel.response, this.response);
  });
};




Cry.prototype.getResponse = async function () {

  this.random = random.getNum(3);

  retrievedDate = db.get('cry.date')
  .value()

  if (retrievedDate === undefined){
    return `The Earl is above such peasent things as crying. I don't think he has ever cried`
  }
  else {
    let response =  await this.randomCry(this.random, retrievedDate)
    return response
  }

}



Cry.prototype.randomCry = (random, date) => {

  if(random === 0){
    return `Kenny last cried on stream ${date}. and that's okay`
  }
  else if (random === 1){
    return `Kenny last cried on stream on ${date}. It was all just too much`
  }
  else if (random === 2){
    return `Kenny last shed some tears in front of us on ${date}. it's strong to show your emotions`
  }

};
module.exports = Cry;
