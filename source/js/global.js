(function(global) {
  // 主题相关
  const POSEIDON_THEME = "poseidon_theme";
  const THEME_ACTIVE_CLASS = 'active';
  const THEME_MODE_AUTO = 'auto';
  const THEME_MODE_LIGHT = 'light';
  const THEME_MODE_DARK = 'dark';

  const getThemeKey = () => {
    const localTheme = window.localStorage.getItem(POSEIDON_THEME);
    return localTheme || THEME_MODE_AUTO;
  }
  const saveThemeKey = (val) => {
    window.localStorage.setItem(POSEIDON_THEME, val);
  }
  const setThemeKey = (key) => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    let themeMode = '';
    if (key !== THEME_MODE_AUTO) {
      themeMode = key;
    } else if (darkThemeMq.matches) {
      // 如果系统是暗黑模式
      themeMode = THEME_MODE_DARK;
    } else {
      themeMode = THEME_MODE_LIGHT;
    }
    document.documentElement.setAttribute("theme", themeMode);
  }
  const initThemeKey = () => {
    const themeVal = getThemeKey();
    setThemeKey(themeVal);
  }

  global.POSEIDON_THEME = POSEIDON_THEME;
  global.THEME_ACTIVE_CLASS = THEME_ACTIVE_CLASS;
  global.THEME_MODE_AUTO = THEME_MODE_AUTO;
  global.THEME_MODE_LIGHT = THEME_MODE_LIGHT;
  global.THEME_MODE_DARK = THEME_MODE_DARK;
  global.getThemeKey = getThemeKey;
  global.saveThemeKey = saveThemeKey;
  global.setThemeKey = setThemeKey;
  global.initThemeKey = initThemeKey;
})(window);