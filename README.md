# Find The Main Content In An HTML Page

Module for finding the main content on a page with the help of Cheerio. It can convert it into markdown, text or keep it in HTML.

It removes header, footer, menu, sidebar, ...

# Installation

```bash
$ npm install find-main-content -S
```

You need also to use Cheerio

```bash
$ npm install cheerio -S
```

# Simple usage

```javascript
const cheerio = require('cheerio');
const { findContent } = require('find-main-content');

const $ = cheerio.load('<html> .... </html>');

// Return a nice data structure within the main content &
// some extract infos on links, images, headers, title, description, ...
const html = findContent($); // get the main content in the html format
const txt = findContent($, 'txt'); // get the main content in the txt format
const md = findContent($, 'md'); // get the main content in the markdown format
```

# Options

You can control how to extract the main div with some options. You can specify a subset of the following attributes.

```javascript

const options = {

  // If more then one H1 is found, use the first one as the main title of the page
  useFirstH1: true,

  // Remove the H1 from the main content, the H1 will be in the final json structure
  removeH1FromContent: true,

  // Some site set some links in Hn, if true, we remove them
  removeHeadersWithoutText: true,

  // if true, don't add the images in the final extraction
  removeImages: true,

  // Remove HTML tag figcaption
  removeFigcaptions: true,

  // Replace links by their anchor text
  replaceLinks: true,

  // Remove HTML Form
  removeForm: false,

  // Remove basic html tags that have no children
  removeEmptyTag: false

  // Remove tags that match to selectors
  removeTags : '... ' // list of selectors separated by comma or line break

  // The HTML selector. If specified, the main content will be extracted from the html element that matchs to the selector
  htmlSelector : '...'


};

const  cheerio  = require('cheerio');
const { findContent } = require('find-main-content');

const $ = cheerio.load('<html> .... </html>');

const data = findContent($, 'html', options);

```

## Structure returned by the function findContent

```
{
  title: '...',
  description: "...',
  images: [
    {
      src: 'https://... .jpg',
      alt: '...'
    },
    ...
  ],
  links: [
    {
      href: 'https://...',
      text: '...'
    },

  ],
  headers: [
    {
      type: 'h1',
      text: '...'
    },
    {
      type: 'h2',
      text: '...'
    }
    ...
  ],
  content: '....' // in either html, markdown or txt format
}

```

## Dynamic content

If the page loads dynamically some content with javascript, you can load it with Pupetteer before getting the main content of the page. 

See in this unit test : https://github.com/christophebe/find-main-content/blob/master/test/test-puppeteer.js
