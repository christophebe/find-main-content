// Use this test to check with your pages
// Let me know if it is not working for you
const fs = require('fs');
const util = require('util');
const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

const writeFile = util.promisify(fs.writeFile);

const url = 'https://blog.geld.nl/autoverzekering/auto-gestolen-vervangende-auto-beperkt-vergoed';

// const url = 'https://www.pret-personnel-comparatif.com/pret-auto.html';

describe('Test Find Content', async () => {
  let $ = null;

  beforeEach(async () => {
    console.log('Requesting page ....');
    const options = {
      uri: url,
      encoding: 'utf8',
      resolveWithFullResponse: false,

      // proxy :
      headers: { 'User-Agent': 'Mozilla/5.0' },

      // rejectUnauthorized
      // secureOptions: requ ire('constants').SSL_OP_NO_TLSv1_2,
      transform(body) {
        return cheerio.load(body);
      }
    };

    try {
      $ = await rq(options);
      console.log('End of requesting page');
    } catch (e) {
      console.log(e);
    }
  });

  it('should works', async () => {
    const result = findContent($, true);

    console.log(result);
    await writeFile('./test.md', result.content);
  });
});
