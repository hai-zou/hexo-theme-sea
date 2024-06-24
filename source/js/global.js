const THEME_NAME = 'hexo_theme_sea';
const THEME_ACTIVE_CLASS = 'active';
const THEME_MODE_AUTO = 'auto';
const THEME_MODE_LIGHT = 'light';
const THEME_MODE_DARK = 'dark';

const getThemeKey = () => {
  const localTheme = window.localStorage.getItem(THEME_NAME);
  return localTheme || THEME_MODE_AUTO;
}

const saveThemeKey = (themeKey) => {
  window.localStorage.setItem(THEME_NAME, themeKey);
}

const getThemeMode = (themeKey) => {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (themeKey !== THEME_MODE_AUTO) {
    return themeKey;
  } else if (darkThemeMq.matches) {
    // 如果系统是暗黑模式
    return THEME_MODE_DARK;
  } else {
    return THEME_MODE_LIGHT;
  }
}

const setThemeMode = (themeMode) => {
  document.documentElement.setAttribute("theme", themeMode);
}

const themeKey = getThemeKey();
const themeMode = getThemeMode(themeKey);
setThemeMode(themeMode);