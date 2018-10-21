import { logger } from "@/helpers.js";

const log = logger("[auth]");

const state = {
  authUser: null,
  userData: null,
  loading: false,
  error: null
};

const getters = {
  inited: state => state.inited,
  authUser: state => state.authUser,
  loading: state => state.loading,
  error: state => state.error
};

const actions = (fireAuth, fireStore) => {
  const changeUser = async ({ commit }, user) => {
    commit("userChanged", user);
    if (user) {
      commit("loading");
      const data = await fireStore
        .collection("managers")
        .doc(user.uid)
        .get()
        .then(snapshot => (snapshot.exists ? snapshot.data() : null));
      commit("userDataChanged", data);
    } else {
      commit("userDataChanged", null);
    }
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

  return Object.freeze({ changeUser, loginWithEmailPassword, logout });
};

const mutations = {
  loading(state) {
    state.loading = true;
  },
  userChanged(state, user) {
    state.authUser = user;
    state.loading = false;
    log("User changed", user);
  },
  userDataChanged(state, data) {
    state.userData = data;
    state.loading = false;
    log("UserData changed", data);
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    log("Error catched", state.error);
  }
};

export default (fireAuth, fireStore) => ({
  namespaced: true,
  state,
  getters,
  actions: actions(fireAuth, fireStore),
  mutations
});
