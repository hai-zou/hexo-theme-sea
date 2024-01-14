'use strict';

const cheerio = require('cheerio');

hexo.extend.helper.register('page_anchor', str => {
    const $ = cheerio.load(str, { decodeEntities: false });
    const headings = $('h1, h2, h3, h4, h5, h6');

    if (!headings.length) return str;

    headings.each(function () {
        const id = $(this).attr('id');

        $(this)
            .addClass('article-heading')
            .append(`<a class="article-anchor" href="#${id}" aria-hidden="true"></a>`);
    });

    return $.html();
});