import { logger } from "@/helpers";

const log = logger("[layout]");

export const themes = {
  light: "Light",
  dark: "Dark"
};

const state = {
  theme: themes.light,
  drawerOpen: false
};

const getters = {
  theme: state => state.theme,
  darkTheme: state => (state.theme === themes.dark ? true : false)
};

const actions = () => {
  const initLocalStorage = ({ commit }) => {
    if (window.localStorage !== undefined) {
      const theme = localStorage.theme;
      if (theme) {
        commit("themeChanged", theme);
      }
    } else {
      log("No Web Storage support");
    }
  };
  const changeTheme = ({ commit }, theme) => commit("themeChanged", theme);
  const toggleDrawer = ({ commit }) => commit("drawerToggled");
  return Object.freeze({ initLocalStorage, changeTheme, toggleDrawer });
};

const mutations = {
  themeChanged(state, theme) {
    state.theme = theme;
    localStorage.setItem("theme", theme);
    log("Theme changed", theme);
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
