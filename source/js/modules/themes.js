const THEMES = ['blue-theme', 'cyan-theme'];

const changeThemeToDefault = () => {
  THEMES.forEach(theme => {
    document.body.classList.remove(theme);
  });
}

const changeTheme = (themeNumber) => {
  changeThemeToDefault();
  document.body.classList.add(THEMES[themeNumber]);
}

export { changeTheme, changeThemeToDefault };
