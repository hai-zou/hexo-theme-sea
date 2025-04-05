/* global hexo */

'use strict';

hexo.extend.tag.register('note', (args, content) => {
  const className = args.shift();
  let header = '';
  let result = '';

  if (args.length) {
    header += `<strong class="note-title">${args.join(' ')}</strong>`;
  }

  result += `<blockquote class="note ${className}">${header}`;
  result += hexo.render.renderSync({ text: content, engine: 'markdown' });
  result += '</blockquote>';

  return result;
}, true);

hexo.extend.tag.register('friends', () => {
  const friends = hexo.theme.config.friends || [];
  const friendsEle = friends.map(item => {
    return `
      <a class="sea-friend-card sea-hover-list-item" href="${item.link}" target="_blank">
        <img class="sea-friend-avatar" src="${item.avatar}" alt="${item.name}" />
        <div class="sea-friend-content">
          <div class="sea-friend-name" title="${item.name}">${item.name}</div>
          <div class="sea-friend-desc" title="${item.desc}">${item.desc}</div>
        </div>
      </a>
    `;
  });
  const friendsEleStr = friendsEle.join('');
  return `<div class="sea-friend-wrapper">${friendsEleStr}</div>`;
});

hexo.extend.tag.register('works', () => {
  const works = hexo.theme.config.works || [];
  const getTags = (tags) => {
    if (!tags) return '';
    return tags.map(item => `<span class="sea-works-tag">${item}</span>`).join('');
  };
  const worksEle = works.map(item => {
    return `
      <div class="sea-works-card">
        ${item.cover ?`<a
          class="sea-works-cover"
          href="${item.link}"
          target="_blank"
        >
          <img src="${item.cover}" alt="${item.name}" />
        </a>` : ''}
        <div class="sea-works-content">
          <a
            class="sea-works-title"
            href="${item.link}"
            target="_blank"
            title="${item.name}"
          >
            ${item.name}
          </a>
          <div class="sea-works-desc" title="${item.desc}">${item.desc}</div>
          <div class="sea-works-tags">${getTags(item.tags)}</div>
        </div>
      </div>
    `;
  });
  return `<div class="sea-works-wrapper">${worksEle.join('')}</div>`;
});