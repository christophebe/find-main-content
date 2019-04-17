// Use this test to check with your pages
// Let me know if it is not working for you
const fs = require('fs');
const util = require('util');
const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

const writeFile = util.promisify(fs.writeFile);

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
    const result = findContent($, true);

    console.log(result);
    await writeFile('./test.md', result.content);
  });
});
