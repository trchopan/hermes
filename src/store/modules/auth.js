import { logger } from "@/helpers.js";

const state = {
  inited: false,
  currentUser: null,
  loading: false,
  error: null
};

const getters = {
  isLoggedIn: state =>
    state.currentUser && state.currentUser.uid ? true : false,
  currentUser: state => state.currentUser,
  loading: state => state.loading,
  error: state => state.error
};

const actions = firebaseAuth => {
  const init = async ({ commit }) => {
    commit("loading");
    const userPromise = new Promise((resolve, reject) =>
      firebaseAuth.onAuthStateChanged(user => resolve(user))
    );
    commit("inited", await userPromise);
  };

  const loginWithEmailPassword = async ({ commit }, credential) => {
    logger("Logging in...");
    commit("loading");
    const { email, password } = credential;
    try {
      const firebaseUser = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      commit("loggedIn", firebaseUser.user);
    } catch (error) {
      commit("errorCatched", error);
    }
  };

  const logout = async ({ commit }) => {
    commit("loading");
    try {
      await firebaseAuth.signOut();
      commit("loggedOut");
    } catch (error) {
      commit("errorCatched", error);
    }
  };

  return Object.freeze({ init, loginWithEmailPassword, logout });
};

const mutations = {
  inited(state, firebaseUser) {
    state.loading = false;
    state.inited = true;
    state.currentUser = firebaseUser ? firebaseUser.user : null;
    logger("Inited with", firebaseUser);
  },
  loading(state) {
    state.loading = true;
  },
  loggedIn(state, user) {
    state.loading = false;
    state.currentUser = user;
    logger("Logged in", state.currentUser);
  },
  loggedOut(state) {
    state.loading = false;
    state.currentUser = null;
    logger("Logged out");
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    logger("Error catched", state.error);
  }
};

export default deps => ({
  namespaced: true,
  state,
  getters,
  actions: actions(deps),
  mutations
});
