'use strict';

hexo.extend.helper.register('generatePageTitle', function(page) {
  const config = this.config;
  const siteTitle = config.title || '';
  const subtitle = config.subtitle || '';
  let pageTitle = '';

  if (this.is_archive()) {
    pageTitle = this.__('page.archive');
  } else if (this.is_tag()) {
    pageTitle = page.tag;
  } else if (this.is_category()) {
    pageTitle = page.category;
  } else if (this.is_post() || this.is_page()) {
    pageTitle = page.title;
  }

  if (this.is_home()) {
    if (siteTitle && subtitle) {
      return `${siteTitle} | ${subtitle}`;
    } else if (siteTitle) {
      return siteTitle;
    } else if (subtitle) {
      return subtitle;
    }
  } else {
    if (pageTitle) {
      return `${pageTitle} | ${siteTitle}`;
    } else {
      return siteTitle;
    }
  }
});
