import axios from "axios";
import { logger } from "@/helpers.js";

const log = logger("[user]");
// const usersCol = "users";

const state = {
  usersList: {},
  loading: {
    list: false
  },
  error: null
};

const getters = {
  usersList: state => state.usersList,
  loading: state => state.loading,
  error: state => state.error
};

/**
 * @param {firebase.functions.Functions} fireFunctions
 */
const actions = fireFunctions => {
  const listUsersCallable = fireFunctions.httpsCallable("listUsers");

  const makeKing = async ({ commit }, payload) => {
    await axios
      .post(process.env.VUE_APP_API + "/user/makeAdmin", payload)
      .then(res => res.data)
      .catch(error => {
        throw error.response.data;
      });
  };

  const listUsers = async ({ commit }) => {
    try {
      const users = await listUsersCallable();
      log("woot", users.data);
      commit("listUsersReceived", users);
    } catch (error) {
      commit("errorCatched", error, { root: true });
    }
  };

  return Object.freeze({ listUsers, makeKing });
};

const mutations = {
  loading(state, process) {
    state.loading = { ...state.loading, ...process };
    log("Loading", process);
  },
  listUsersReceived(state, users) {
    state.usersList = users;
    log("List users", users);
  }
};

export default fireFunctions => ({
  namespaced: true,
  state,
  getters,
  actions: actions(fireFunctions),
  mutations
});
