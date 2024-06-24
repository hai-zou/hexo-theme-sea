const themeConfig = hexo.config.theme_config;

function isEnableAlgolia() {
  return themeConfig.search && themeConfig.search.enable && themeConfig.search.type === 'algolia';
}

hexo.extend.injector.register('head_end', () => {
  if (isEnableAlgolia()) {
    return `
      <link rel="stylesheet" href="https://unpkg.com/@docsearch/css@3.5.2/dist/style.css">
      ${hexo.extend.helper.get('css').bind(hexo)('/css/plugins/docsearch.css')}
    `;
  }
  return '';
}, 'default');

hexo.extend.injector.register('body_end', () => {
  if (isEnableAlgolia()) {
    return `
      <script type="module">
        import "https://unpkg.com/@docsearch/js@3.5.2/dist/umd/index.js";
        docsearch({
          container: '#sea-search-input',
          appId: '${themeConfig?.algolia?.appId || ''}',
          apiKey: '${themeConfig?.algolia?.apiKey || ''}',
          indexName: '${themeConfig?.algolia?.indexName || ''}',
        });
      </script>
    `;
  }
  return '';
}, 'default');

hexo.extend.helper.register('generateSearchHtml', function() {
  if (isEnableAlgolia()) {
    return `
      <a class="sea-float-tools-btn" id="sea-search-icon">
        <i class="sea-font">search</i>
      </a>
      <div id="sea-search-input"></div>
    `;
  }
  return '';
});
