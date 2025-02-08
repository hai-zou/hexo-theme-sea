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
  const navToggle = document.getElementById('sea-nav-toggle');
  const dimmer = document.getElementById('sea-nav-dimmer');
  const closeBtn = document.getElementById('sea-menu-close-icon');
  const CLASS_NAME = 'sea-nav-on';
  if (!navToggle) return;

  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    body.classList.toggle(CLASS_NAME);
  });

  const closeFun = (e) => {
    if (!body.classList.contains(CLASS_NAME)) return;
    e.preventDefault();
    body.classList.remove(CLASS_NAME);
  };

  dimmer.addEventListener('click', closeFun);
  closeBtn.addEventListener('click', closeFun);
}

onDocSearch();
onMobileNavShow();