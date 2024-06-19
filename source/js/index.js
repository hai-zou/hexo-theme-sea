(function () {
  'use strict';

  // 回到顶部
  const backTopEle = document.getElementById('sea-back-to-top');
  backTopEle.style.display = 'none';
  if (!backTopEle) return;
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      backTopEle.style.display = 'flex';
    } else {
      backTopEle.style.display = 'none';
    }
  });

  // 搜索
  const searchIconEle = document.getElementById('sea-search-icon');
  const searchInputEle = document.getElementById('sea-search-input');
  if (!searchIconEle) return;
  searchIconEle.addEventListener('click', () => {
    const btnEle = searchInputEle.querySelector('.DocSearch');
    btnEle.click();
  });
}());