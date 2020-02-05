const request = require('request');
const cheerio = require('cheerio');
const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
// const pschannel = require('../helpers/pubsubchannels');




request(`https://www.royaltysoaps.com/search?q=strawberry`, (error, response, html) => {
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
  }
});
