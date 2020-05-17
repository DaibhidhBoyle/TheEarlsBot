const Options = require('./src/models/options.js');
const Config = require('./src/models/config.js');
const ChatBot = require('./src/models/chatBot.js');
const Basic = require('./src/models/basic.js');
const Friend = require('./src/models/friends.js');
const Rules = require('./src/models/rules.js');
const Social = require('./src/models/social.js');
const Shoutout = require('./src/models/shoutout.js');
const Streak = require('./src/models/streak.js');
const Soap = require('./src/models/soap.js');
const GoodBot = require('./src/models/goodBot.js');


const social = new Social();
social.bindSocial();

const basic = new Basic();
basic.bindBasic();

const friend = new Friend();
friend.bindFriend();

const rules = new Rules();
rules.bindRules();

const soap = new Soap();
soap.bindSoap();

const shoutout = new Shoutout();
shoutout.bindShoutout();

const streak = new Streak();
streak.bindStreak();

const goodBot = new GoodBot
goodBot.bindGoodBot();







const chatBot = new ChatBot();
chatBot.bindChatBot();

const config = new Config();
config.bindConfig()
