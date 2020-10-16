const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
const prompt = require("prompt-async");
const formatdate = require('../helpers/formatdate.js');
const random = require('../helpers/random.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('beardDb.json')
const db = low(adapter)


const Beard = function (){
  this.response = null;
  this.date = null;

  this.random = null;

};

Beard.prototype.bindBeard = async function () {

  db.defaults({ beard: {date: undefined}})
  .write()

  console.log('Hello lad, have you shaved since last using the bot?');
  var ask = await prompt.get('shaved');
  let shaved = ask.shaved.toLowerCase();

  let date = new Date();
  date.setHours(0,0,0,0);

  let formatted_date = await formatdate.format(date)

  if(shaved === 'yes' || shaved === 'y'){
    console.log('Looking sharp! how many days ago did you cut the fuzz? (please use 0 for today)');
    ask = await prompt.get('days');
    let days = parseInt(ask.days, 10);
    let isDaysANumber = Number.isNaN(days);
    while (isDaysANumber == true){
      console.log('That is not a number I know. No really, how many days ago? (please use 0 for today)');
      ask = await prompt.get('days');
      days = parseInt(ask.days, 10);
      isDaysANumber = isNaN(days);
    }
    date.setDate(date.getDate() - days);
    let formatted_date = await formatdate.format(date)

    db.set('beard.date', `${formatted_date}`)
    .write()

    console.log('Beard updated');
  }
  else if (shaved === 'no' || shaved === 'n'){
    let datecheck = db.get('beard.date')
    .value()
    if (datecheck === undefined){
      db.set('beard.date', `${formatted_date}`)
      .write()
        console.log('Beard initalised');
    } else {
      console.log('Beard stayed same');
    }
  }
  PubSub.subscribe(pschannel.beard, async (msg, data) => {

    this.response = ' '

    this.random = random.getNum(3);

    this.response = await this.randomBeard(this.random);

    PubSub.publish(pschannel.response, this.response);

  })
};


Beard.prototype.randomBeard = (random) => {

  retrievedDate = db.get('beard.date')
  .value()
  if(random === 0){
    return `Kenny last shaved on ${retrievedDate}. And hot dog he's looking sharp!`
  }
  else if (random === 1){
    return `The Earl last shaved on ${retrievedDate}. His face is starting to look a little fuzzy`
  }
  else if (random === 2){
    return `${retrievedDate} was the date of Kenny's infamous last shave. Etched in every history book lest we forget`
  }
};

module.exports = Beard;
