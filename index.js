const HEADERS = 'h1,h2,h3,h4,h5,h6,h7';
const BASIC_CONTENT = 'h1,h2,h3,h4,h5,h6,h7,p';
const BAD_TAGS = 'script,link,header,style,noscript,form,object,footer,nav,iframe,br';

const N0T_A_GOOD_CLASS = '.combx,.comment,.disqus,.foot,.header,.menu,.meta,.nav,.rss,.shoutbox,.sidebar,.sponsor,.ssba,.bctt-click-to-tweet,.promo,.promotion';
const N0T_A_GOOD_ID = '#combx,#comments,#disqus,#foot,#header,#menu,#meta,#nav,#rss,#shoutbox,#sidebar,#sponsor,#promo,#promotion,#ads';

const CLASS_WEIGHT = 25;
const MIN_LINK_DENSITY = 0.33;
const VERY_GOOD_SCORE = 5;
const GOOD_SCORE = 3;
const BAD_SCORE = -3;
const VERY_BAD_SCORE = -5;

const HALF = 2;
const NBR_CHARS = 100;
const EXTRA_SCORE = 3;

const MIN_CHARS = 25;

const REGEX = {
  positiveRe: /article|body|content|entry|hentry|page|pagination|post|text/i,
  negativeRe: /combx|comment|contact|foot|footer|footnote|link|media|meta|promo|related|scroll|shoutbox|sponsor|tags|widget/i
};

const defaultOptions = {
  useFirstH1: true,
  removeH1FromContent: true,
  removeHeadersWithoutText: true,
  removeImage: true,
  removeDiv: true,
  replaceLinks: true

};

/**
 * findContent - Main function of the module
 *
 * Return the main content of a page without menu, header, footer, sidebar, ....
 *
 * @param  {object} $                        Cheerio reference matching to the HTML page
 * @param  {object} options = defaultOptions List of options to change the content output
 * @returns {string}                         The HTML code of the main content of the page
 */
function findContent($, options = defaultOptions) {
  const result = {
    title: getTitle($),
    description: getDescription($),
    h1: getH1($, options.useFirstH1)
  };

  cleanHTML($);

  if (options.removeHeadersWithoutText) {
    removeHeadersWithoutText($);
  }

  let contentSection = null;

  const div = findContentSection($, contentSection);

  contentSection = div ? $(div) : $('body');

  result.links = findLinks($, contentSection, options);
  result.images = findImages($, contentSection, options);

  if (options.removeH1FromContent) {
    removeH1FromContent($, contentSection);
  }

  if (options.removeDiv) {
    removeDiv($, contentSection);
  }

  console.log(contentSection.html());
  result.content = contentSection.html();

  return result;
}

/**
 * getTitle - get the meta title of the page
 *
 * @param  {object} $  Cheerio ref
 * @returns {string}   the text of the title
 */
function getTitle($) {
  return $('title') ? $('title').text() : null;
}

/**
 * getDescription - get the meta description of the page
 *
 * @param  {object} $ Cheerio ref
 * @returns {string}  the text of the meta description
 */
function getDescription($) {
  return $('meta[name=description]') ? $('meta[name=description]').attr('content') : null;
}

/**
 * getH1 - get the H1 of the page
 *
 * @param  {object} $          The Cheerio ref
 * @param  {boolean} useFirstH1 if multiple H1, return the first one
 * @returns {strin}           The text of the H1
 */
function getH1($, useFirstH1) {
  const nbrH1 = $('body').find('h1').length;

  return nbrH1 === 0 ? null :
    nbrH1 === 1 || useFirstH1 ? $('h1').first().text() : null;
}

/**
 * cleanHTML - Clean the page before finding the main content
 *
 * @param  {object} $       Cheerio ref
 */
function cleanHTML($) {
  $('body').find(BAD_TAGS).remove();
  $('body').find(N0T_A_GOOD_CLASS).remove();
  $('body').find(N0T_A_GOOD_ID).remove();

  // Remove all comments
  $('*')
   .contents()
   .filter((i, e) => e.type === 'comment')
   .remove();
}

/**
 * removeDiv - Remove Div which have not basic content (header or paragraph) or that are empty
 *
 * @param  {object} $              Cheerio reference
 * @param  {object} contentSection the element/tag from which we will find div without content
 */
function removeDiv($, contentSection) {
  contentSection.find('div').each((i, d) => {
    if ($(d).children(BASIC_CONTENT).length === 0) {
      $(d).remove();
    }
  });

  // Remove Div that are empty
  contentSection.find('div').each((i, d) => {
    if ($(d).children().length === 0) {
      $(d).remove();
    }
  });
}

/**
 * removeH1FromContent - Remove the H1 in the content
 *
 * @param  {type} $              Cheerio Reference
 * @param  {type} contentSection the element from which we will find the H1
 */
function removeH1FromContent($, contentSection) {
  const h1 = contentSection.find('h1');

  // Don't remove h1 if there more than one h1
  if (h1.length === 1) {
    $(h1).remove();
  }
}

/**
 * findLinks - Find the links & replace them if necessary
 *
 * @param  {object} $              The cheerion reference
 * @param  {object} contentSection The element/tag from which we will find the links
 * @param  {object} options        The options
 * @returns {Array<object>}        The list of the links found in the content
 */
function findLinks($, contentSection, options) {
  const links = [];

  contentSection.find('a').each((i, a) => {
    links.push({ href: $(a).attr('href'), text: $(a).text() });

    if (options.replaceLinks) {
      $(a).replaceWith($(`<span>${ $(a).text() }</span>`));
    }
  });

  return links;
}

/**
 * findImages - Find the images & remove them if necessary
 *
 * @param  {object} $              The cheerio reference
 * @param  {object} contentSection The element/tag from which we will find the images
 * @param  {object} options        The options
 * @returns {Array<object>}        The list of the images found in the content
 */
function findImages($, contentSection, options) {
  const images = [];

  contentSection.find('img').each((i, img) => {
    images.push({ src: $(img).attr('src'), alt: $(img).attr('alt') });

    if (options.removeImage) {
      $('body').find('img').remove();
    }
  });

  return images;
}

/**
 * removeHeadersWithoutText - Clean out spurious headers are not containing important text
 *
 * @param  {object} $ Cheerion ref
 */
function removeHeadersWithoutText($) {
  $('body').find(HEADERS).each((i, header) => {
    if (getClassWeight($, header) < 0 || getLinkDensity($, header) > MIN_LINK_DENSITY) {
      $(header).remove();
    }
  });
}

/**
 * findContentSection - description
 * Find the main content div - Using a variety of metrics (content score, classname, element types),
 * Find the content that is most likely to be the stuff a user wants to read.
 *
 * @param  {object} $ The Cheerio ref
 * @returns {object}  the Cheerio element matching to the main content, probably a div
 */
function findContentSection($) {
  const candidates = findGoodCandidates($);
  const topCandidate = getTopCandidate($, candidates);

  return topCandidate;
}

/**
 * findGoodCandidates - Find the best candidates for selecting the main content
 * This is mainly based on a score for each paragrap
 *
 * @param  {object} $ The Cheerio ref
 * @returns {Array<object>}   The List of candidates
 */
function findGoodCandidates($) {
  const candidates = [];

  $('body').find('p').each((i, p) => {
    if ($(p).text().length === 0) {
      $(p).remove();
    }

    // Ignore p with less than a min of chars
    if ($(p).text() < MIN_CHARS) {
      return;
    }

    // Initialize readability data for the paragraph
    if (!p.readability) {
      initializeElement($, p);
      candidates.push(p);
    }

    // Initialize readability data for the parent element
    // The first element in a the array is the parent
    const parent = $(p).parent()['0'];

    if (!parent.readability) {
      initializeElement($, parent);
      candidates.push(parent);
    }

    let contentScore = 1;

    // Add points for any commas within this paragraph
    const text = $(p).text();

    contentScore += text.split(',').length;

    // For every 100 characters in this paragraph, add an extra scrore of 3 points
    contentScore += Math.min(Math.floor(text.length / NBR_CHARS), EXTRA_SCORE);

    /* Add the score to the p. The parent gets half. */
    p.readability.contentScore += contentScore;
    parent.readability.contentScore += contentScore / HALF;
  });

  return candidates;
}

/**
 * getTopCandidate - Return the top candiate matching to the main content of the page
 *
 * @param  {object} $          The Cheerio reference
 * @param  {Array} candidates The list of candidate elements
 * @returns {object}            The top candidate
 */
function getTopCandidate($, candidates) {
  let topCandidate = null;

  for (const c of candidates) {
    // Scale the final candidates score based on link density. Good content should have a
    // relatively small link density (5% or less) and be mostly unaffected by this operation.
    c.readability.contentScore = c.readability.contentScore * (1 - getLinkDensity($, c));

    if (!topCandidate || c.readability.contentScore > topCandidate.readability.contentScore) {
      topCandidate = c;
    }
  }

  return topCandidate;
}

/**
 * initializeElement - Initialize the score of an element
 *
 * @param  {object} $ The Cheerio ref
 * @param  {object} e The element
 */
function initializeElement($, e) {
  e.readability = { contentScore: getContentScore(e.name) };
  e.readability.contentScore += getClassWeight($, e);
}

/**
 * getContentScore - Calculate the score of an element
 *
 * @param  {string} elementName The name (tag) of an element
 * @returns {number}             The score
 */
function getContentScore(elementName) {
  return elementName.toUpperCase() === 'DIV' ? VERY_GOOD_SCORE :
    [ 'PRE', 'TD', 'BLOCKQUOTE' ].includes(elementName) ? GOOD_SCORE :
      [ 'ADDRESS', 'OL', 'UL', 'DL', 'DD', 'DT', 'LI', 'FORM' ].includes(elementName) ? BAD_SCORE :
        [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TH' ].includes(elementName) ? VERY_BAD_SCORE : 0;
}

/**
 * getClassWeight - Calculate the weigth of a class of an element
 *
 * @param  {object} $       The Cheerio reference
 * @param  {object} element The element to chech
 * @returns {number}         The weight
 */
function getClassWeight($, element) {
  let weight = 0;

  /* Look for a special classname */
  const c = $(element).attr('class');

  if (c && c !== '') {
    if (c.search(REGEX.negativeRe) !== -1) {
      weight -= CLASS_WEIGHT;
    }

    if (c.search(REGEX.positiveRe) !== -1) {
      weight += CLASS_WEIGHT;
    }
  }

  /* Look for a special ID */
  const id = $(element).attr('id');

  if (id && typeof id === 'string' && id !== '') {
    if (id.search(REGEX.negativeRe) !== -1) {
      weight -= CLASS_WEIGHT;
    }

    if (id.search(REGEX.positiveRe) !== -1) {
      weight += CLASS_WEIGHT;
    }
  }

  return weight;
}

/**
 * getLinkDensity - Return the link density versus text for an element
 *
 * @param  {object} $       The Cheerio ref
 * @param  {object} element The element to check
 * @returns {number}         The link density value
 */
function getLinkDensity($, element) {
  const textLength = removeExtraChars($(element).text()).length;
  let linkLength = 0;

  $(element).find('a').each((i, a) => {
    linkLength += $(a).text().length;
  });

  return linkLength / textLength;
}

// Remove carriage return in a string
function removeExtraChars(s) {
  return s.replace(/\s+/g, ' ').trim();
}

exports.findContent = findContent;
