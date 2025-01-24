const pagination = require("hexo-pagination");

hexo.extend.generator.register('tags', function () {
  return {
    path: 'tags/index.html',
    layout: ['page'],
    data: {
      type: 'tags',
      comment: false
    }
  };
});

hexo.extend.generator.register('categories', function () {
  return {
    path: 'categories/index.html',
    layout: ['page'],
    data: {
      type: 'categories',
      comment: false
    }
  };
});

hexo.extend.generator.register('articles', function (locals) {
  const themeConfig = hexo.theme.config;
  const path = themeConfig.articles.path || 'articles'; // 默认路径为 'articles'
  const perPage = themeConfig.articles.per_page || 10; // 每页文章数
  const orderBy = themeConfig.articles.order_by || '-date'; // 默认按日期降序排序

  const posts = locals.posts.sort(orderBy);

  return pagination(path, posts, {
    perPage: perPage,
    layout: ['articles'],
    data: {},
  });
});