import { logger } from "@/helpers.js";

const log = logger("[auth]");

const state = {
  authUser: null,
  profile: null,
  loading: false,
  error: null
};

const getters = {
  authUser: state => state.authUser,
  profile: state => state.profile,
  loading: state => state.loading,
  error: state => state.error
};

const actions = (fireAuth, fireStore) => {
  const changeUser = async ({ commit }, user) => {
    commit("userChanged", user);
    if (!user) {
      commit("profileChanged", null);
    } else {
      commit("loading");
      try {
        const data = await fireStore
          .collection("users")
          .doc(user.uid)
          .get()
          .then(
            snapshot => (snapshot && snapshot.exists ? snapshot.data() : null)
          );
        commit("profileChanged", data);
      } catch (error) {
        commit("errorCatched", error);
      }
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
  profileChanged(state, data) {
    state.profile = data;
    state.loading = false;
    state.error = null;
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
