// Use this test to check with your pages
// Let me know if it is not working for you

const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

const url = '';

describe('Test Find Content', async () => {
  let $ = null;

  beforeEach(async () => {
    console.log('Requesting page ....');
    const options = {
      uri: url,
      resolveWithFullResponse: false,
      transform(body) {
        return cheerio.load(body);
      }
    };

    $ = await rq(options);
    console.log('End of requesting page');
  });

  it('should works', async () => {
    // const content = findContent($);
    // console.log(content);
    console.log(findContent($));
  });
});
