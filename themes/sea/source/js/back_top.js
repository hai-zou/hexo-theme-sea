(function () {
  'use strict';

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
}());
