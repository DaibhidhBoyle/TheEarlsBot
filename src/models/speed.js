// add catches (try)
// change to filter
//form respoonse

const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');
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

  this.game = null;
};

Speed.prototype.bindSpeed = function () {

  PubSub.subscribe(pschannel.speed, async (msg, data) => {
    this.response = ' '

    this.message = data.message

    this.message = this.message.replace('!speedrun', '').trim();
    this.message = this.message.replace('!speed', '').trim();

    this.game = await this.setGame()
    let catLink = await this.getCategoryLink(this.game);
    let listOfRuns = await this.getRunLinks(catLink);
    let listOfLeaders = await this.getLeaderboard(listOfRuns);
    let leaderInfo = await this.getLeadPlayerLinks(listOfLeaders);
    let runTimes = leaderInfo.map(x => x['time'])
    let leadPlayers = await this.getLeadPlayers(leaderInfo);
    this.response = await this.formResponse(this.game, listOfRuns, leadPlayers, runTimes);


    PubSub.publish(pschannel.response, this.response);

  });
};

Speed.prototype.setGame = async function (){
  let livedata = await twitch.searchChannels('TheHaboo')
  // data.channel)
  return livedata['channels'][0]['game']
}

Speed.prototype.getCategoryLink = async (game) => {


  let formattedGame = game.split(" ").join("%20")
  formattedGame = formattedGame.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  let gamedata = await axios.get(`https://www.speedrun.com/api/v1/games?name=${formattedGame}`)
    //   .catch((error) => {
    //   this.response =  'Something has gone wrong with this speed search. Sorry :('
    // });
    for (link of gamedata.data.data[0]['links']){
      if (link['rel'] === 'categories'){
        return link['uri'];
      };
    };
  };

  Speed.prototype.getRunLinks = async function (link) {
    let listOfLinks = [];
    let popularRuns = ['any%', '100%' , 'low%', 'glitchless']
    let gamedata = await axios.get(link)
    // .catch((error) => {
    //   this.response =  'Something has gone wrong with this speed search. Sorry :('
    // });
    let rundata = gamedata['data']['data']
    for (runinfo of rundata) {
      let lowerRunName = runinfo['name'].toLowerCase()
      if (popularRuns.includes(lowerRunName)){
        let popularRunInfo = await this.configRunResponse(runinfo)
        let usedname = listOfLinks.map(x => x['name'])
        if (!usedname.includes(popularRunInfo['name'])){
          listOfLinks.push(popularRunInfo)
        }
      }
    }
    let i =0
    while (i <4 && listOfLinks.length < 3){
      randomizenumber = random.getNum(rundata.length);
      let lowerRunName = rundata[randomizenumber]['name'].toLowerCase()
      if (!popularRuns.includes(lowerRunName)){
        let runInfo = await this.configRunResponse(rundata[randomizenumber])
        listOfLinks.push(runInfo);
      }
      i++
    }
    return listOfLinks
  }


  Speed.prototype.configRunResponse = async (run) => {
    let name = run['name'];
    let weblink = run['links'][0]['uri']
    let runInfo = {
      name: name,
      weblink: weblink
    }
    return runInfo
  }

  Speed.prototype.getLeaderboard = async function (runInfo){
    let listOfLeaderBoards = []
    let runLinks = runInfo.map(x => x['weblink'])
    for (runLink of runLinks){
      let fullRunInfo = await axios.get(runLink);
      // change to a filter
      for (link of fullRunInfo['data']['data']['links']){
        if (link['rel'] === 'leaderboard'){
          listOfLeaderBoards.push(link['uri'])
        };
      }
    }
    return listOfLeaderBoards;
  }

  Speed.prototype.getLeadPlayerLinks = async function (boardLinks){
    let listOfPlayerLinks = []
    for (link of boardLinks){
      let boardInfo = await axios.get(link);
      boardRunInfo = boardInfo['data']['data']['runs'].filter(function (el) {
        return el.place === 1
      })[0]
      let playerLinks = boardRunInfo['run']['players'].map(x => x['uri'])
      let time = boardRunInfo['run']['times']['primary'];
      let formattedTime = await this.parseTime((timecalc.parse(time)))
      listOfPlayerLinks.push({playerLinks: playerLinks, time: formattedTime});
    }
    return listOfPlayerLinks;
  }

  Speed.prototype.getLeadPlayers = async function (leaderInfo){
    let names = [ ]
    let playerLinks = leaderInfo.map(x => x['playerLinks'])
    for (playerLink of playerLinks){
      if (playerLink.length === 1){
        nameData = await axios.get(playerLink[0]);
        names.push(nameData['data']['data']['names']['international']);
      } else {
        currentNames = []
        for (player of playerLink){
          nameData = await axios.get(player);
          name = nameData['data']['data']['names']['international'];
          currentNames.push(name)
        }
        names.push(currentNames);
      }
    }
    return names
  }

  Speed.prototype.formResponse = async function (gameTitle, runs, playerNames, times){
    // For super cool warriors X; daibhidh holds the fast time in glitchless with 3h4m5s, ross and tom in all% with 5m4s and Jess in killyourson% with 2s
    console.log(gameTitle);
    console.log(runs);
    console.log(playerNames);
    console.log(times);
    response = `For ${gameTitle}`
    
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
