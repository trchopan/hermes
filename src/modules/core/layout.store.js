import { logger } from "@/helpers";

const log = logger("[layout]");

export const themes = {
  light: "Light",
  dark: "Dark"
};

export const languages = {
  vi: { code: "vi", name: "Tiếng Việt", char: "🇻🇳" },
  en: { code: "en", name: "English", char: "🇬🇧" }
};

const state = {
  theme: themes.light,
  drawerOpen: false,
  language: languages.vi
};

const getters = {
  theme: state => state.theme,
  darkTheme: state => (state.theme === themes.dark ? true : false),
  drawerOpen: state => state.drawerOpen,
  language: state => state.language
};

const actions = () => {
  const initLocalStorage = ({ commit }) => {
    if (window.localStorage !== undefined) {
      const theme = localStorage.theme;
      if (theme) {
        changeTheme({ commit }, theme);
      }

      try {
        const language = JSON.parse(localStorage.language);
        if (language) {
          changeLanguage({ commit }, language);
        }
      } catch (_) {
        localStorage.removeItem("language");
      }
    } else {
      log("No Web Storage support");
    }
  };
  const changeLanguage = ({ commit }, language) => {
    commit("languageChanged", language);
  };
  const changeTheme = ({ commit }, theme) => commit("themeChanged", theme);
  const toggleDrawer = ({ commit }) => commit("drawerToggled");
  return Object.freeze({
    initLocalStorage,
    changeLanguage,
    changeTheme,
    toggleDrawer
  });
};

const mutations = {
  themeChanged(state, theme) {
    state.theme = theme;
    localStorage.setItem("theme", theme);
    log("Theme changed", theme);
  },
  languageChanged(state, language) {
    state.language = language;
    localStorage.setItem("language", JSON.stringify(language));
    log("Language changed", language);
  },
  drawerToggled(state) {
    state.drawerOpen = !state.drawerOpen;
    log("Drawer toggled", state.drawerOpen);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions: actions(),
  mutations
};
