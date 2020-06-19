// Use this test to check with your pages
// Let me know if it is not working for you
const fs = require('fs');
const util = require('util');
const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

const { findContent } = require('../index.js');

const writeFile = util.promisify(fs.writeFile);

const url = 'https://www.joinpapa.com/blog/how-to-teach-technology-to-seniors';


describe('Test Find Content with Puppeteer for dynamic pages', async () => {
  let $ = null;

  beforeEach(async () => {

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      $ = cheerio.load(await page.content());
      await browser.close();
    } catch (e) {
      console.log(e);
    }


  });

  it('Convert in txt', async () => {
    const result = findContent($, 'txt');

    await writeFile('./testp.txt', result.content);
  });

  it('Convert in html', async () => {
    const result = findContent($, 'html');

    await writeFile('./testp.html', result.content);
  });

  it('Convert in md', async () => {
    const result = findContent($,'md');
    await writeFile('./testp.md', result.content);
  });
});
