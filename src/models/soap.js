const request = require('request');
const cheerio = require('cheerio');

const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const Soap= function (){
  this.message = null
  this.response = null
  this.links = []
  this.products = []
};

Soap.prototype.bindSoap = function () {

    PubSub.subscribe(pschannel.soap, (msg, data) => {

    let messageWithoutSoap = data.replace('!soap', ' ')
    this.message = messageWithoutSoap.replace(/ /g, '+');

request(`https://www.royaltysoaps.com/search?q=${this.message}`, (error, response, html) => {
  if(!error && response.statusCode == 200){
    const $ = cheerio.load(html);

    let links = [];
    let products = [];

    const loop = $('h2 a')
    .each((i, el) => {
      const productNames = $(el).text();
      products.push(productNames);
      const allLinks = $(el).attr('href');
      links.push(allLinks)

    });

    console.log(links[0]);
    console.log(products[0]);
  };
});

    PubSub.publish(pschannel.response, this.message);

  });
};
