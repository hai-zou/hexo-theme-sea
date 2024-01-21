(function () {
    'use strict';

    const POSEIDON_THEME = "poseidon_theme";
    const THEME_ACTIVE_CLASS = 'active';
    // 主题模式
    const THEME_MODE_AUTO = 'auto';
    const THEME_MODE_LIGHT = 'light';
    const THEME_MODE_DARK = 'dark';

    function getThemeKey() {
        const localTheme = window.localStorage.getItem(POSEIDON_THEME);
        return localTheme || THEME_MODE_AUTO;
    }

    function saveThemeKey(val) {
        window.localStorage.setItem(POSEIDON_THEME, val);
    }

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

    function setTheme(key) {
        setActive(key);
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

    // 初始化主题
    const themeVal = getThemeKey();
    setTheme(themeVal);

    // 切换主题
    autoEle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveThemeKey(THEME_MODE_AUTO);
        setTheme(THEME_MODE_AUTO);
    });
    lightEle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveThemeKey(THEME_MODE_LIGHT);
        setTheme(THEME_MODE_LIGHT);
    });
    darkEle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        saveThemeKey(THEME_MODE_DARK);
        setTheme(THEME_MODE_DARK);
    });
}());
