const CONFIGUREOPTIONS = 'Config: options-set';
const BEARD = 'ChatBot: chat message to be repled by when streamer last shaved';
const SOCIAL = 'ChatBot: chat message to be repled by social media links';
const RSSOCIAL = 'ChatBot: chat message to be repled by social media links about royality soaps';
const BASIC = 'ChatBot: chat message to get to know streamer/bot';
const FRIENDCODES = 'Chatbot: chat message to get console friend codes for streamer';
const RIOT = 'Chatbot: message to trigger addition onto riot counter';
const RULES = 'Chatbot: chat message to deliver specific rules for a mod';
const SOAP = 'ChatBot: chat query to return search result from royality soaps';
const SHOUTOUT = 'ChatBot: chat message to link out to other twitch streamer';
const STREAK = 'ChatBot: chat message to return the amount of days in a row the streamer has used bot on stream';
const STREAKSET = 'ChatBot: chat message to set the amount of days in a row the streamer has used bot on stream';
const SPEED = 'ChatBot: chat message to return the top speed run of a searched game';
const TIMED = 'ChatBot: timed signal to return random social response';
const TIMEDSET = 'ChatBot: chat message to set a message that will answer every timed response';
const CRY = 'ChatBot: chat message to return the last time streamer cried';
const TEAR = 'ChatBot: chat message to set time streamer last cried for a mod';
const LURK = 'ChatBot: chat message to respond with how many lurks there has been';
const MODONLY = 'ChatBot: ready a mod only response to Twitch';
const BOTMAINTAINANCE = 'ChatBot: chat command to respond when bot is addressed by user';
const RESPONSE = '*: ready response to Twitch';
const RESPONSENOTAT = '*: ready response to Twitch with no @ symbol';
const RIOTRESPONSE = 'Riot: readies response to twitch and changes color to red';


exports.configureoptions = CONFIGUREOPTIONS;
exports.beard = BEARD;
exports.social = SOCIAL;
exports.rssocial = RSSOCIAL;
exports.basic = BASIC;
exports.friend = FRIENDCODES;
exports.riot = RIOT;
exports.cry = CRY;
exports.tear = TEAR;
exports.rules = RULES;
exports.soap = SOAP;
exports.shoutout = SHOUTOUT;
exports.streak = STREAK;
exports.streakset = STREAKSET;
exports.speed = SPEED;
exports.timed = TIMED;
exports.timedset = TIMEDSET
exports.lurk = LURK;
exports.bot = BOTMAINTAINANCE;
exports.response = RESPONSE;
exports.responseNoAt = RESPONSENOTAT
exports.responseriot = RIOTRESPONSE;
exports.modonly = MODONLY;

const NEWCOUNTER = 'ChatBot: chat message to create a new counter in counter database';
const DELETECOUNTER = 'ChatBot: chat message to delete a  counter in counter database';
const COUNT = 'ChatBot: chat message to retrieve the count on a specfied command from database';
const COUNTMOD = 'ChatBot: chat message to affect count database as a mod';
const QUICKADD = 'Chatbot: chat message to add one to the latest counter used';
const QUICKSUBTRACT = 'Chatbot: chat message to takes one away from the latest counter used';
const ALLCOUNTERS = 'Chatbot: chat message to returns all the counters for Mods';
const COUNTERSLIST = 'Counter: response and set up new counter'

exports.newcounter = NEWCOUNTER;
exports.deletecounter = DELETECOUNTER;
exports.count = COUNT;
exports.countmod = COUNTMOD;
exports.quickadd = QUICKADD;
exports.quicksubtract = QUICKSUBTRACT;
exports.allcounters = ALLCOUNTERS;
exports.updateCountersList = COUNTERSLIST;
