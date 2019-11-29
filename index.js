const tmi = require('tmi.js');


const options = {

options: {
  debug:true,
},
connection: {
  cluster: 'aws',
  reconnect: true,
},
identity: {
  username: 'SoapBot',
  password: ,
},
  channels: ['TheEarlsBot']
};

const client = new tmi.Client(options);

client.connect();

client.on('connected', (address, port) => {
  client.action('TheEarlsBot', 'Hello')
});

client.on('chat', (channel, user, message, self) => {
  if (message === '!check') {
    client.action('TheEarlsBot', '123');
  }

  client.action('TheEarlsBot', `hello ${user['display-name']}`)
});
