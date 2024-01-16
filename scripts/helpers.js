'use strict';

const cheerio = require('cheerio');

hexo.extend.helper.register('page_anchor', str => {
    const $ = cheerio.load(str, { decodeEntities: false });
    const headings = $('h1, h2, h3, h4, h5, h6');

    if (!headings.length) return str;

    headings.each(function () {
        $(this).addClass('article-heading');
    });

    return $.html();
});