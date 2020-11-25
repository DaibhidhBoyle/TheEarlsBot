const Beard = require('./src/models/beard.js');
const Options = require('./src/models/options.js');
const Config = require('./src/models/config.js');
const ChatBot = require('./src/models/chatBot.js');
const Basic = require('./src/models/basic.js');
const Friend = require('./src/models/friends.js');
const Riot = require('./src/models/riot.js');
const Cry = require('./src/models/cry.js');
const Rules = require('./src/models/rules.js');
const Social = require('./src/models/social.js');
const RsSocial = require('./src/models/rssocial.js');
const Shoutout = require('./src/models/shoutout.js');
const Streak = require('./src/models/streak.js');
const Speed = require('./src/models/speed.js');
const Soap = require('./src/models/soap.js');
const Lurk = require('./src/models/lurk.js');
const GoodBot = require('./src/models/goodBot.js');
const Counter = require('./src/models/counter.js');


const binds = async () => {

  const beard = new Beard();
  await beard.bindBeard();

  const social = new Social();
  social.bindSocial();

  const rssocial = new RsSocial();
  rssocial.bindRsSocial();

  const basic = new Basic();
  basic.bindBasic();

  const friend = new Friend();
  friend.bindFriend();

  const riot = new Riot();
  riot.bindRiot();

  const cry = new Cry();
  cry.bindCry();

  const rules = new Rules();
  rules.bindRules();

  const soap = new Soap();
  soap.bindSoap();

  const shoutout = new Shoutout();
  shoutout.bindShoutout();

  const streak = new Streak();
  streak.bindStreak();

  const speed = new Speed();
  speed.bindSpeed();

  const lurk = new Lurk();
  lurk.bindLurk();

  const goodBot = new GoodBot
  goodBot.bindGoodBot();

  const counter = new Counter
  counter.bindCounter();

  const chatBot = new ChatBot();
  chatBot.bindChatBot();

  const config = new Config();
  config.bindConfig()
}

binds();
