const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

// const should = require('chai').should();

const url = 'https://www.leefjepensioen.nl/blogoverzicht/blog-detail/deeltijdpensioen-steeds-meer-in-trek/419';

describe('Test Find Content', async () => {
  let $ = null;

  beforeEach(async () => {
    const options = {
      uri: url,
      resolveWithFullResponse: false,
      transform(body) {
        return cheerio.load(body);
      }
    };

    $ = await rq(options);
  });

  it('should works', async () => {
    // const content = findContent($);
    // console.log(content);
    console.log(findContent($));
  });
});
