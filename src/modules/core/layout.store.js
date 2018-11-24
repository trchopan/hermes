import { logger } from "@/helpers";
import { themes, languages } from "./layout.models.js";

const log = logger("[layout]");

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
      const theme = localStorage.getItem("theme");
      if (theme) {
        changeTheme({ commit }, theme);
      }

      const languageCode = localStorage.getItem("language");
      if (languageCode) {
        const language = languages[languageCode] || languages.vi;
        changeLanguage({ commit }, language);
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
    localStorage.setItem("language", language.value);
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
