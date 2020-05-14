const request = require('request');
const cheerio = require('cheerio');
var TinyURL = require('tinyurl');
var Promise = require('promise');

const tmi = require('tmi.js');
const PubSub = require('pubsub-js');
const pschannel = require('../helpers/pubsubchannels');

const Soap = function (){
  this.message = null;
  this.response = null;
  this.url = null
  this.shortUrl = null
  this.answer = null
};

Soap.prototype.bindSoap = function () {

  PubSub.subscribe(pschannel.soap, (msg, data) => {
    this.response = ' '
    this.message = data.trim();

    if (this.message === '!soap'){
      this.response = `It looks like your trying to search for royality soap products but haven't said what you're searching for :( a good example would be typing '!soap honey'`
    };

    let messageWithoutSoap = this.message.replace('!soap', ' ')

    let urlEnd = messageWithoutSoap.replace(/ /g, '+');
    this.url = `https://www.royaltysoaps.com/search?q=` + `${urlEnd}`
    request(`${this.url}`, async (error, response, html) => {
      if(!error && response.statusCode == 200){
        let $ = cheerio.load(html);

        const links = [];
        const products = [];

        $('h2 a').each((i, el) => {
          let productNames = $(el).text();
          products.push(productNames);
          let allLinks = $(el).attr('href');
          links.push(allLinks);
        });

        await this.ShortenLink(`${this.url}`);
        await short.then(result => {
          this.url = result
        });

        await this.ShortenLink(`http://www.royaltysoaps.com${links[0]}`);
          await short.then(result => {
            this.shortUrl = result
          });

          if (links.length !== products.length){
            this.response = `That could be a lot of great products! Check them all out here: ${this.url}`;
          }
          else if (links.length === 0 && this.message !== '!soap'){
            this.response = `I couldn't find anything matching your search results. :( but you can checkout out Royalty Soap's whole range at www.royaltysoaps.com`;
          }
          else if (links.length === 1){
            this.response = `I found the ${products[0]} available at ${this.shortUrl}`;
          }
          else if (links.length > 1){
            this.response = `There's a lot of great products matching your search! Like the ${products[0]} Available at ${this.shortUrl}. Have a look at them all at ${this.url}` + ` ` + `!`;
          }


          PubSub.publish(pschannel.response, this.response);
        };
      });
    });


    Soap.prototype.ShortenLink= (url) => {

      short = TinyURL.shorten(url).then(res => {
        return res;
      })

    };
  };


  module.exports = Soap;
