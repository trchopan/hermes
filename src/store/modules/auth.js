import { logger } from "@/helpers.js";

const log = logger("[auth]");

const state = {
  inited: false,
  currentUser: null,
  loading: false,
  error: null
};

const getters = {
  inited: state => state.inited,
  currentUser: state => state.currentUser,
  loading: state => state.loading,
  error: state => state.error
};

const actions = (fireAuth, parser) => {
  const init = async ({ commit }) => {
    log("Initializing...");
    commit("loading");
    await new Promise(resolve => {
      fireAuth.onAuthStateChanged(user => {
        commit("userChanged", parser(user));
        resolve();
      });
    });
    commit("inited");
    return;
  };

  const loginWithEmailPassword = async ({ commit }, credential) => {
    log("Logging in...");
    commit("loading");
    const { email, password } = credential;
    try {
      await fireAuth.signInWithEmailAndPassword(email, password);
      commit("loggedIn");
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
      commit("loggedOut");
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
    state.loading = false;
    log("Initialized");
  },
  userChanged(state, user) {
    state.currentUser = user;
    log("User changed", user);
  },
  loggedIn(state) {
    state.loading = false;
    log("Logged in");
  },
  loggedOut(state) {
    state.loading = false;
    log("Logged out");
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    log("Error catched", state.error);
  }
};

export default (auth, parser) => ({
  namespaced: true,
  state,
  getters,
  actions: actions(auth, parser),
  mutations
});

export function parseFireAuth(data) {
  return data
    ? {
        email: data.email,
        uid: data.uid
      }
    : null;
}
