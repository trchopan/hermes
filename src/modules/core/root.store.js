import { logger } from "@/helpers.js";

const log = logger("[rootStore]");

export const rootStore = {
  state() {
    return { error: [] };
  },
  getters: {
    error: state => state.error
  },
  actions: {
    dismissError: ({ commit }, errorCode) => {
      commit("errorDismissed", errorCode);
    },
    clearError: ({ commit }) => {
      commit("errorCleared");
    }
  },
  mutations: {
    errorCatched(state, error) {
      state.error = state.error.concat(error);
      log("Error catched", error);
    },
    errorDismissed(state, errorCode) {
      state.error = state.error.filter(x => x.code != errorCode);
      log("Error dismissed", errorCode);
    },
    errorCleared(state) {
      state.error = [];
      log("Error cleared");
    }
  }
};
