// add catches (try)

const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
const capitalise = require('../helpers/capitalise.js');
const random = require('../helpers/random.js');
const axios = require('axios');
const timecalc =  require('iso8601-duration');


const Twitch = require("twitch.tv-api");
const twitch = new Twitch({
  id: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

const Speed = function (){
  this.response = null;
  this.message = null;
  this.channel = null;

  this.game = null;
};

Speed.prototype.bindSpeed = function () {

  PubSub.subscribe(pschannel.speed, async (msg, data) => {
    this.response = ' '

    this.message = data.message
    this.channel = data.channel

    this.message = this.message.replace('!speedrun', '').trim();
    this.message = this.message.replace('!speed', '').trim();

    this.game = await this.setGame(this.channel)
    let selectedRuns = await this.getCategoryLink(this.game);
    this.response = await this.formResponse(this.game, selectedRuns)


    PubSub.publish(pschannel.response, this.response);

  });
};

Speed.prototype.setGame = async function (channel){
  let livedata = await twitch.searchChannels(`${channel}`)
  return livedata['channels'][0]['game']
}

Speed.prototype.getCategoryLink = async function (game){


  let formattedGame = game.split(" ").join("%20")
  formattedGame = formattedGame.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  let gamedata = await axios.get(`https://www.speedrun.com/api/v1/games?name=${formattedGame}`)
    .catch(function (error) {
      console.log(error);
      PubSub.publish(pschannel.response, `Sorry! I can't find any speed run information for ${this.game} :(`);
    });
    if (gamedata.status !== 200 || !Array.isArray(gamedata.data.data) || !gamedata.data.data.length){
      PubSub.publish(pschannel.response, `Sorry! I can't find any speed run information for ${this.game} :(`);
    }

    for (link of gamedata.data.data[0]['links']){
      if (link['rel'] === 'categories'){
        let allrunsinfo = await this.getRunLinks(link['uri'])
        return allrunsinfo
      };
    };
  };

  Speed.prototype.getRunLinks = async function (link){
    let listOfRuns = [];
    let popularRuns = ['any%', '100%' , 'low%']
    let runValues = [];
    let postSearchLength = null;


    let gamedataRecieved = await axios.get(link)
    .catch(function (error) {
      console.log(error);
      PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
    });
    if (gamedataRecieved.status !== 200 ){
      PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
    }
    let rundata = gamedataRecieved['data']['data']
    for (runinfo of rundata) {
      let lowerRunName = runinfo['name'].toLowerCase()
      if (popularRuns.includes(lowerRunName) || lowerRunName.includes('glitchless')){
        let popularRunInfo = await this.configRunResponse(runinfo)
        let usedname = listOfRuns.map(x => x['name'])
        if (!usedname.includes(popularRunInfo['name'])){
          listOfRuns.push(popularRunInfo)
        }
        runValues = await this.getLeaderboard(listOfRuns.map(x => x['weblink']))
        postSearchLength = runValues.length
      }
    }


    let i =0
    while (i <4){
      if (runValues.length > 3) {
        break
      }

      randomizenumber = random.getNum(rundata.length);
      let lowerRunName = rundata[randomizenumber]['name'].toLowerCase()
      if (!popularRuns.includes(lowerRunName)){
        let runInfo = await this.configRunResponse(rundata[randomizenumber])
        let usedname = listOfRuns.map(x => x['name'])
        if (!usedname.includes(runInfo['name'])){
          listOfRuns.push(runInfo)
        }
        let onlyNonPopularRuns = listOfRuns.slice(postSearchLength)
        unpopularRunInfo = await this.getLeaderboard(onlyNonPopularRuns.map(x => x['weblink']))
        if (unpopularRunInfo.length !== 0) {
          runValues.push(unpopularRunInfo)
          runValues = runValues.flat()
        }
        await this.getLeaderboard(onlyNonPopularRuns.map(x => x['weblink']))
        postSearchLength += runValues.length
      }
      i++
    }

    let runInfo = runValues.map(function (value, index){
      value.runName = listOfRuns[index]['name']
      return value
    });
    return runInfo
  }


  Speed.prototype.configRunResponse = async function (run){
    let name = run['name'];
    let weblink = run['links'][0]['uri']
    let runInfo = {
      name: name,
      weblink: weblink
    }
    return runInfo
  }

  Speed.prototype.getLeaderboard = async function (runLinks){
    let listOfLeaderBoards = []
    for (runLink of runLinks){
      let fullRunInfo = await axios.get(runLink)
      .catch(function (error) {
        console.log(error);
        PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
      });
      if (fullRunInfo.status !== 200 ){
        PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
      }
      for (link of fullRunInfo['data']['data']['links']){
        if (link['rel'] === 'leaderboard'){
          listOfLeaderBoards.push(link['uri'])
        }
      };
    }
    return this.getLeadPlayerLinks(listOfLeaderBoards);
  }

  Speed.prototype.getLeadPlayerLinks = async function (boardLinks){
    let listOfPlayerLinks = []
    let listOfTimes = []
    for (link of boardLinks){
      let boardInfo = await axios.get(link)
      .catch(function (error) {
        console.log(error);
        PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
      });
      if (boardInfo.status !== 200 ) {
        PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
      }
      boardRunInfo = boardInfo['data']['data']['runs'].filter(function (el) {
        return el.place === 1
      })[0]
      let playerLinks = boardRunInfo['run']['players'].map(x => x['uri'])
      listOfPlayerLinks.push(playerLinks)
      let time = boardRunInfo['run']['times']['primary'];
      let formattedTime = await this.parseTime((timecalc.parse(time)))
      listOfTimes.push(formattedTime)
    }
    let playerNames = await this.getLeadPlayers(listOfPlayerLinks)
    let runValues = playerNames.map(function (value, index){
      return {name: value,
        time: listOfTimes[index]  }
      });
      return runValues
    }

    Speed.prototype.getLeadPlayers = async function (playerLinks){
      let names = [ ]
      for (playerLink of playerLinks){
        if (playerLink.length === 1){
          nameData = await axios.get(playerLink[0])
          .catch(function (error) {
            console.log(error);
            PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
          });
          if (nameData.status !== 200 ){
            PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
          }
          names.push(nameData['data']['data']['names']['international']);
        } else {
          currentNames = []
          for (player of playerLink){
            nameData = await axios.get(player)
            .catch(function (error) {
              console.log(error);
              PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
            });
            if (nameData.status !== 200 ){
              PubSub.publish(pschannel.response, `Sorry. Something went wrong with that search. Please try again later`);
            }
            name = nameData['data']['data']['names']['international'];
            currentNames.push(name)
          }
          names.push(currentNames);
        }
      }
      return names
    }


    Speed.prototype.formResponse = async function (gameTitle, choosenRuns){
      let runs = choosenRuns.map(x => x['runName'])
      let playerNames = choosenRuns.map(x => x['name'])
      let times = choosenRuns.map(x => x['time'])
      response = `For ${gameTitle}`
      let i;

      for (i = 0; i < runs.length; i++) {
        if (i > 0 && i !== runs.length - 1){
          response += ';';
        } else if (i > 0 && i === runs.length - 1){
          response += ';' + ' ' + 'and' + ' ';
        }
        if (Array.isArray(playerNames[i])){
          flattenedNames = playerNames[i].join(', ').replace(/, ([^,]*)$/, ' and $1')
          response += ' ' + flattenedNames
        } else {
          response += ' ' + playerNames[i]
        }
        if (i === 0 && Array.isArray(playerNames[i])){
          response += ' ' + 'hold the fastest time'
        } else if (i === 0 && !Array.isArray(playerNames[i])){
          response += ' ' + 'holds the fastest time'
        }
        response += ' ' + `in ${runs[i]} with ${times[i]}`
      }
      return response
    }



    Speed.prototype.parseTime = async function (time){
      let formattedTime = ''
      if (time.weeks > 0) {formattedTime = formattedTime + ' ' + `${Math.floor(time.weeks)} w`}
      if (time.days > 0) {formattedTime = formattedTime + ' ' +  `${Math.floor(time.days)} d`}
      if (time.hours > 0) {formattedTime = formattedTime + ' ' + `${Math.floor(time.hours)} h`}
      if (time.minutes > 0) {formattedTime = formattedTime + ' ' + `${Math.floor(time.minutes)} m`}
      if (time.seconds > 0) {formattedTime = formattedTime +  ' ' + `${Math.floor(time.seconds)} s`}
      return formattedTime
    }



    module.exports = Speed;
