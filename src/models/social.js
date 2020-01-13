// const tmi = require('tmi.js');
// const PubSub = require('pubsub-js');
//
// const Social = function (){
// };
//
// const SOCIALHANDLER = 'ChatBot: deliever social message request';
// const RESPONSE = '*: Reply from query';
//
//
// Social.prototype.bindChatBot = function () {
//   PubSub.subscribe(OPTIONSCONFIGURED, (msg, data) => {
//     let message = data.lowercase
//     let response = null
//     switch (message) {
//       case '!social':
//       response = `Kenny is all over the internet! Catch him at:
//       Instagram - http://bit.ly/theearlofsuds
//       Youtube - https://www.youtube.com/channel/UCwjJe8wSeT_NwPVHY_J5QyA
//
//       Or making soaps at:
//       Instagram -  http://bit.ly/2uRox1V
//       Twitter - http://bit.ly/2QAZI33
//       Facebook - http://bit.ly/2QFB5lE
//       Youtube - youtube.com/royaltysoaps
//
//       Or join the fun over at the community discord - https://discordapp.com/invite/PmK33d4`
//     };
//     PubSub.publish(RESPONSE, response);
//     break;
//   });
// };
