hexo.extend.filter.register('template_locals', locals => {
  const allPosts = locals.site.posts.sort('-date').toArray(); // 按日期降序排序
  const recommendedPosts = allPosts.filter(post => post.recommend === true); // 筛选推荐文章

  // 将结果保存到 locals 中，供模板使用
  locals.recommendedPosts = recommendedPosts.slice(0, 5);
  locals.recentPosts = allPosts.slice(0, 5);
  locals.isLocalServer = hexo.env.cmd === 'server';
  return locals;
});