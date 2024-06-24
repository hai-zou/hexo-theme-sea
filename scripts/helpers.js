'use strict';

hexo.extend.helper.register('generatePageTitle', function(page) {
  const config = this.config;
  const siteTitle = config.title || '';
  const siteDesc = config.description || '';
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
    if (siteTitle && siteDesc) {
      return `${siteTitle} | ${siteDesc}`;
    } else if (siteTitle) {
      return siteTitle;
    } else if (siteDesc) {
      return siteDesc;
    }
  } else {
    if (pageTitle) {
      return `${pageTitle} | ${siteTitle}`;
    } else {
      return siteTitle;
    }
  }
});
