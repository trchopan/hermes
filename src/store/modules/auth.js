import { logger } from "@/helpers.js";

const log = logger("[auth]");

const state = {
  inited: false,
  currentUser: null,
  redirect: null,
  loading: false,
  error: null
};

const getters = {
  inited: state => state.inited,
  currentUser: state => state.currentUser,
  loading: state => state.loading,
  error: state => state.error
};

const actions = fireAuth => {
  const init = async ({ commit }) => {
    log("Initializing...");
    commit("loading");
    log("location", window.location.pathname);
    commit("redirectInited", window.location.pathname);
    fireAuth.onAuthStateChanged(user => {
      const authUser = user
        ? { uid: user.uid, email: user.email }
        : { uid: "", email: "" };
      commit("userChanged", authUser);
    });
  };

  const loginWithEmailPassword = async ({ commit }, credential) => {
    log("Logging in...");
    commit("loading");
    const { email, password } = credential;
    try {
      await fireAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  };

  const logout = async ({ commit }) => {
    log("Loggin out...");
    commit("loading");
    try {
      await fireAuth.signOut();
      return true;
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  };

  return Object.freeze({ init, loginWithEmailPassword, logout });
};

const mutations = {
  loading(state) {
    state.loading = true;
  },
  inited(state) {
    state.inited = true;
    log("Initialized");
  },
  redirectInited(state, path) {
    state.redirect = path;
    log("Redirect path changed", path);
  },
  userChanged(state, user) {
    state.currentUser = user;
    state.loading = false;
    log("User changed", user);
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    log("Error catched", state.error);
  }
};

export default auth => ({
  namespaced: true,
  state,
  getters,
  actions: actions(auth),
  mutations
});
