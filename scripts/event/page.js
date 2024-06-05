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