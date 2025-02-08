const THEME_NAME = 'hexo_theme_sea';

const THEME_MODE_LIGHT = 'light';
const THEME_MODE_DARK = 'dark';

const getThemeKey = () => {
  const localTheme = window.localStorage.getItem(THEME_NAME);
  return localTheme || THEME_MODE_LIGHT;
}

const saveThemeKey = (themeKey) => {
  window.localStorage.setItem(THEME_NAME, themeKey);
}

const setThemeKey = (key) => {
  document.documentElement.setAttribute("theme", key);
}

function onInitSetThemeKey() {
  const themeKey = getThemeKey();
  setThemeKey(themeKey);
}

onInitSetThemeKey();