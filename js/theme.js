// View Transitions API | 添加主题切换过渡效果
function toggleTheme(key, event) {

  // 为不支持此 API 的浏览器提供回退方案：
  if (!document.startViewTransition) {
    setThemeKey(key);
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
    setThemeKey(key);
  });

  // 等待伪元素创建完成：
  transition.ready.then(() => {
    const clipPath = [
      `circle(0 at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    const isDark = key === THEME_MODE_DARK;
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

function toggleGiscusTheme(key) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage({
    giscus: {
      setConfig: { theme: key }
    }
  }, "https://giscus.app");
}

function onThemeChange() {
  const lightEle = document.getElementById('sea-theme-light');
  const darkEle = document.getElementById('sea-theme-dark');
  if (!lightEle || !darkEle) return;

  function setActive(key) {
    switch (key) {
      case THEME_MODE_LIGHT:
        lightEle.style.display = 'none';
        darkEle.style.display = 'block';
        break;
      case THEME_MODE_DARK:
        lightEle.style.display = 'block';
        darkEle.style.display = 'none';
        break;
      default:
        break;
    }
  }

  const themeKey = getThemeKey();
  setActive(themeKey);

  lightEle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveThemeKey(THEME_MODE_LIGHT);
    setActive(THEME_MODE_LIGHT);
    toggleGiscusTheme(THEME_MODE_LIGHT);
    toggleTheme(THEME_MODE_LIGHT, e);
  });
  darkEle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    saveThemeKey(THEME_MODE_DARK);
    setActive(THEME_MODE_DARK);
    toggleGiscusTheme(THEME_MODE_DARK);
    toggleTheme(THEME_MODE_DARK, e);
  });

  // 添加事件监听器来监测主题切换
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  darkThemeMq.addEventListener('change', () => {
    if (darkThemeMq.matches) {
      // 如果系统是暗黑模式
      saveThemeKey(THEME_MODE_DARK);
      setActive(THEME_MODE_DARK);
      toggleGiscusTheme(THEME_MODE_DARK);
      setThemeKey(THEME_MODE_DARK);
    } else {
      saveThemeKey(THEME_MODE_LIGHT);
      setActive(THEME_MODE_LIGHT);
      toggleGiscusTheme(THEME_MODE_LIGHT);
      setThemeKey(THEME_MODE_LIGHT);
    }
  });
}

onThemeChange();