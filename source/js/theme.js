// View Transitions API | 添加主题切换过渡效果
function toggleTheme(key, event) {
  const mode = getThemeMode(key);

  // 为不支持此 API 的浏览器提供回退方案：
  if (!document.startViewTransition) {
    setThemeMode(mode);
    toggleGiscusTheme(mode);
    return;
  }

  // 获取点击位置，或者回退到屏幕中间
  const x = event.clientX ?? innerWidth / 2;
  const y = event.clientY ?? innerHeight / 2;
  // 获取到最远角的距离
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  // 开始一次视图过渡：
  const transition = document.startViewTransition(() => {
    setThemeMode(mode);
    toggleGiscusTheme(mode);
  });

  // 等待伪元素创建完成：
  transition.ready.then(() => {
    const clipPath = [
      `circle(0 at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const isDark = mode === THEME_MODE_DARK;
    // 新视图的根元素动画
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "ease-in",
        // 指定要附加动画的伪元素
        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
      },
    );
  });
}

function toggleGiscusTheme(themeMode) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage({
    giscus: {
      setConfig: { theme: themeMode }
    }
  }, "https://giscus.app");
}

function onThemeChange() {
  const autoEle = document.getElementById('sea-theme-auto');
  const lightEle = document.getElementById('sea-theme-light');
  const darkEle = document.getElementById('sea-theme-dark');
  if (!autoEle || !lightEle || !darkEle) return;

  function setActive(key) {
    switch (key) {
      case THEME_MODE_AUTO:
        autoEle.classList.add(THEME_ACTIVE_CLASS);
        lightEle.classList.remove(THEME_ACTIVE_CLASS);
        darkEle.classList.remove(THEME_ACTIVE_CLASS);
        break;
      case THEME_MODE_LIGHT:
        lightEle.classList.add(THEME_ACTIVE_CLASS);
        autoEle.classList.remove(THEME_ACTIVE_CLASS);
        darkEle.classList.remove(THEME_ACTIVE_CLASS);
        break;
      case THEME_MODE_DARK:
        darkEle.classList.add(THEME_ACTIVE_CLASS);
        autoEle.classList.remove(THEME_ACTIVE_CLASS);
        lightEle.classList.remove(THEME_ACTIVE_CLASS);
        break;
      default:
        break;
    }
  }

  // 初始化主题
  setActive(themeKey);

  autoEle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveThemeKey(THEME_MODE_AUTO);
    toggleTheme(THEME_MODE_AUTO, e);
    setActive(THEME_MODE_AUTO);
  });
  lightEle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveThemeKey(THEME_MODE_LIGHT);
    toggleTheme(THEME_MODE_LIGHT, e);
    setActive(THEME_MODE_LIGHT);
  });
  darkEle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveThemeKey(THEME_MODE_DARK);
    toggleTheme(THEME_MODE_DARK, e);
    setActive(THEME_MODE_DARK);
  });
}

onThemeChange();