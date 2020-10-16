const PubSub = require('pubsub-js');
const pschannel = require('./pubsubchannels');


module.exports.checkIfMod = function (user) {
  let level = false
  if (user[`badges`] !== null){
    let badges = Object.keys(user[`badges`])
    level = badges.includes('moderator') || badges.includes('broadcaster')
  }
  return level

}

module.exports.checkIfStreamer =function (user) {
  let level = false
  if (user[`badges`] !== null){
    let badges = Object.keys(user[`badges`])
    level = badges.includes('broadcaster')
  }
  return level
}
