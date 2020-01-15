const tmi = require('tmi.js');
const PubSub = require('pubsub');

// const Handler = function () {
// };
//
// Handler.prototype.bindHandler = function () {
//   let response = null
//   let message = data.toLowerCase();
//
//
//   PubSub.subscribe(HANDLER, (msg, data) => {
//
//     if (message.includes(`!social` || `!twitter` || `!faceboook` || `!fb` || `!instagram` || `!insta` || `!youtube` || `!yt` || '!discord')) {
//       PubSub.publish(SOCIAL, message);
//     }
//     else if (message.includes('!soapbot')) {
//       response = `I am SoapBot; a bot here to help with whatever you need. Nice to meet you! If you want to have a look at kenny's soaps try typing '!Soap' into the chat. Or to find out more about our chat team competition type '!Team'.`
//       PubSub.publish(RESPONSE, response);
//     };
//   });
// };
//
// module.exports = Handler;
