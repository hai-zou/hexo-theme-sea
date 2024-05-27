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
      <a class="sea-friend-card" href="${item.link}" target="_blank">
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