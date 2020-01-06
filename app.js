const Options = require('./src/models/options.js');
const Config = require('./src/models/config.js');
const ChatBot = require('./src/models/chatBot.js')

const chatBot = new ChatBot();
chatBot.bindChatBot();

const config = new Config();
config.bindConfig()
