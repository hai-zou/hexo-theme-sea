// 回到顶部
function onScrollBackTop() {
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
}

// 搜索
function onDocSearch() {
  const searchIconEle = document.getElementById('sea-search-icon');
  const searchInputEle = document.getElementById('sea-search-input');
  if (!searchIconEle) return;
  searchIconEle.addEventListener('click', () => {
    const btnEle = searchInputEle.querySelector('.DocSearch');
    btnEle.click();
  });
}

// 移动端菜单
function onMobileNavShow() {
  const body = document.body;
  const navToggle = document.getElementById('sea-mobile-nav-toggle');
  const dimmer = document.getElementById('sea-mobile-nav-dimmer');
  const CLASS_NAME = 'sea-mobile-nav-on';
  if (!navToggle) return;

  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    body.classList.toggle(CLASS_NAME);
  });

  dimmer.addEventListener('click', function (e) {
    if (!body.classList.contains(CLASS_NAME)) return;

    e.preventDefault();
    body.classList.remove(CLASS_NAME);
  });
}

onScrollBackTop();
onDocSearch();
onMobileNavShow();