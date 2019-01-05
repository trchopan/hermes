import { logger } from "@/helpers.js";
import { themes, languages } from "./root.models.js";

const log = logger("[rootStore]");

export const rootStore = {
  state: {
    error: [],
    localStorageStatus: false,
    theme: themes.light,
    drawerOpen: false,
    language: languages.vi
  },
  getters: {
    error: state => state.error,
    theme: state => state.theme,
    darkTheme: state => (state.theme === themes.dark ? true : false),
    drawerOpen: state => state.drawerOpen,
    language: state => state.language
  },
  actions: {
    initLocalStorage: ({ commit, dispatch }) => {
      if (window.localStorage !== undefined) {
        commit("localStorageAvailable");
        const theme = localStorage.getItem("theme");
        if (theme) {
          dispatch("changeTheme", theme);
        }

        const languageCode = localStorage.getItem("language");
        if (languageCode) {
          const language = languages[languageCode] || languages.vi;
          commit("languageChanged", language);
        }
      } else {
        log("No Web Storage support");
      }
    },
    catchError: ({ commit }, error) => {
      commit("errorCatched", error);
    },
    dismissError: ({ commit }, errorCode) => {
      commit("errorDismissed", errorCode);
    },
    clearError: ({ commit }) => {
      commit("errorCleared");
    },
    changeLanguage: ({ commit }, language) => {
      commit("languageChanged", language);
    },
    changeTheme: ({ commit }, theme) => commit("themeChanged", theme),
    toggleDrawer: ({ commit }) => commit("drawerToggled")
  },
  mutations: {
    errorCatched(state, error) {
      state.error = state.error.concat(error);
      log("Error catched", error);
    },
    errorDismissed(state, errorIndex) {
      state.error = state.error.splice(errorIndex, 1);
      log("Error dismissed", errorIndex);
    },
    errorCleared(state) {
      state.error = [];
      log("Error cleared");
    },
    localStorageAvailable(state) {
      state.localStorageStatus = true;
    },
    themeChanged(state, theme) {
      state.theme = theme;
      state.localStorageStatus && localStorage.setItem("theme", theme);
      log("Theme changed", theme);
    },
    languageChanged(state, language) {
      state.language = language;
      state.localStorageStatus &&
        localStorage.setItem("language", language.value);
      log("Language changed", language);
    },
    drawerToggled(state) {
      state.drawerOpen = !state.drawerOpen;
      log("Drawer toggled", state.drawerOpen);
    }
  }
};
