// const axios = require('axios');
// // Cannot use import statement outside a module
//
// axios.get('https://www.speedrun.com/api/v1/games/transistor')
//   .then ((response) => {
//     arrayoflinks = response.data.data.links
//     // console.log(response.data.data.runs[0].run.players[0].uri);
//   });
//
//   axios.get('https://www.speedrun.com/api/v1/games/v1ppjz18/categories')
//     .then((response) => {
//       console.log(response.data);
//     });
//
//
//
// axios.get('https://www.speedrun.com/api/v1/leaderboards/v1ppjz18/category/zdnz1ndq')
//   .then((response) => {
//     // time = response.data.data.runs[0].run.times.primary
//     // link_player_info = response.data.data.runs[0].run.players[0].uri;
//     // console.log(time);
//   });
//
// axios.get('https://www.speedrun.com/api/v1/users/qj2p378k')
//     .then((response) => {
//       name = response.data.data.names.international
//       // console.log(name);
//     });





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

    let catLink = await this.getCategoryLink();
    let listOfRuns = await this.getRunLinks(catLink);
    let listOfLeaders = await this.getLeaderboard(listOfRuns);
    let leadPlayerLinks = await this.getLeadPlayerLinks(listOfLeaders);
    let leadPlayers = await this.getLeadPlayers(leadPlayerLinks);




    PubSub.publish(pschannel.response, this.response);

  });
};

Speed.prototype.getCategoryLink = async () => {
  let livedata = await twitch.searchChannels('GronkhTV')
  // data.channel)
  this.game = livedata['channels'][0]['game']

  let formattedGame = this.game.split(" ").join("%20")
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
      // listOfPlayerLinks.push(playerLinks);
      let time = boardRunInfo['run']['times']['primary'];
      console.log(timecalc.parse(time));
    }
    return listOfPlayerLinks;
  }

  Speed.prototype.getLeadPlayers = async function (playerLinks){
    // console.log(playerLinks);
    // console.log(playerLinks.flat())
  }



  module.exports = Speed;
