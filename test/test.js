// Use this test to check with your pages
// Let me know if it is not working for you
const fs = require('fs');
const util = require('util');
const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

const writeFile = util.promisify(fs.writeFile);

const url = 'https://www.purina.fr/chiens/dressage-comportement/dressage-chien/techniques-dressage';

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

  it('Convert in txt', async () => {
    const result = findContent($, 'txt');

    console.log(result);
    await writeFile('./test.txt', result.content);
  });

  it('Convert in html', async () => {
    const result = findContent($, 'html');

    console.log(result);
    await writeFile('./test.html', result.content);
  });

  it('Convert in md', async () => {
    const result = findContent($, 'md');

    console.log(result);
    await writeFile('./test.md', result.content);
  });
});
