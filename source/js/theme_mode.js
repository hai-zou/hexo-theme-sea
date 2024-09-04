const THEME_NAME = 'hexo_theme_sea';

const THEME_MODE_LIGHT = 'light';
const THEME_MODE_DARK = 'dark';

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

const getThemeKey = () => {
  const localTheme = window.localStorage.getItem(THEME_NAME);
  return localTheme || THEME_MODE_LIGHT;
}

const saveThemeKey = (themeKey) => {
  window.localStorage.setItem(THEME_NAME, themeKey);
}

const setThemeMode = (themeMode) => {
  saveThemeKey(themeMode);
  document.documentElement.setAttribute("theme", themeMode);
}

function handleThemeChange() {
  if (darkThemeMq.matches) {
    // 如果系统是暗黑模式
    setThemeMode(THEME_MODE_DARK);
  } else {
    setThemeMode(THEME_MODE_LIGHT);
  }
}

// 初始检查用户系统主题
handleThemeChange();