// Use this test to check with your pages
// Let me know if it is not working for you
const fs = require('fs');
const util = require('util');
const rq = require('request-promise-native');
const cheerio = require('cheerio');
const { findContent } = require('../index.js');

const writeFile = util.promisify(fs.writeFile);

const url = 'https://www.jrtmy.info/your-life/training.html';

describe('Test Find Content', async () => {
  let $ = null;

  beforeEach(async () => {

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
    } catch (e) {
      console.log(e);
    }
  });

  it('Convert in txt', async () => {
    const result = findContent($, 'txt');

    await writeFile('./test.txt', result.content);
  });

  it('Convert in html', async () => {
    const result = findContent($, 'html');

    await writeFile('./test.html', result.content);
  });

  it('Convert in md by excluding some html tags', async () => {
    const result = findContent($, 'md', {
      htmlSelector: 'body>div.container>div>div.col-lg-8',
      removeTags: `body > div.container > div > div.col-lg-8 > ol
         body > div.container > div > div.col-lg-8 > h3
         body > div.container > div > div.col-lg-8 > div.menu-sitemap-tree
         body > div.container > div > div.col-lg-8 > hr`
    });

    await writeFile('./test.md', result.content);
  });
});
