const express = require('express');
const Options = require('./src/models/options.js');
const Config = require('./src/models/config.js');
const ChatBot = require('./src/models/chatBot.js')
const Basic = require('./src/models/basic.js')
const Social = require('./src/models/social.js')


const social = new Social();
social.bindSocial();

const basic = new Basic();
basic.bindBasic();

const chatBot = new ChatBot();
chatBot.bindChatBot();

const config = new Config();
config.bindConfig()
