import { logger } from "@/helpers.js";
import { profileParser } from "./auth.models.js";

const log = logger("[auth]");
const usersCol = "users";

const state = {
  authUser: null,
  profile: null,
  loading: {
    profile: false,
    create: false,
    login: false,
    logout: false
  }
};

const getters = {
  authUser: state => state.authUser,
  profile: state => state.profile,
  loading: state => state.loading
};

const actions = (fireAuth, fireStore, userApi) => {
  /**
   * This variable keeps track of firestore snapshot
   * Call it to unsubscribe to onSnapshot
   */
  let _profileSnap;

  const changeUser = ({ commit }, user) => {
    commit("userChanged", user);
    if (!user) {
      commit("profileChanged", null);

      // Stop listening to profile snapshot change
      if (_profileSnap) {
        _profileSnap();
        _profileSnap = undefined;
      }
    } else {
      log("Listening to user profile...");
      commit("loading", { profile: true });
      _profileSnap = fireStore
        .collection(usersCol)
        .doc(user.uid)
        .onSnapshot(
          snapshot => {
            if (snapshot && snapshot.exists) {
              const data = snapshot.data();
              commit("profileChanged", profileParser(data));
            } else {
              commit("profileChanged", null);
              commit(
                "errorCatched",
                { code: "auth/profile-not-found" },
                { root: true }
              );
            }
            commit("loading", { profile: false });
          },
          error => {
            commit("profileChanged", null);
            commit("errorCatched", error, { root: true });
            commit("loading", { profile: false });
          }
        );
    }
  };

  const createUser = async ({ commit }, userCredentials) => {
    commit("loading", { create: true });
    try {
      if (!userCredentials.response) {
        throw { code: "auth/require-captch" };
      }
      await userApi.createUser(userCredentials);
      log("User created");
      commit("loading", { create: false });
      return true;
    } catch (error) {
      commit("errorCatched", error, { root: true });
      commit("loading", { create: false });
      return false;
    }
  };

  const loginWithEmailPassword = async ({ commit }, credential) => {
    commit("loading", { login: true });
    const { email, password } = credential;
    try {
      await fireAuth.signInWithEmailAndPassword(email, password);
      commit("loading", { login: false });
      return true;
    } catch (error) {
      commit("errorCatched", error, { root: true });
      commit("loading", { login: false });
      return false;
    }
  };

  const logout = async ({ commit }) => {
    commit("loading", { logout: true });
    try {
      await fireAuth.signOut();
      commit("loading", { logout: false });
      return true;
    } catch (error) {
      commit("errorCatched", error, { root: true });
      commit("loading", { logout: false });
      return false;
    }
  };

  const updateProfile = async ({ commit, state }, data) => {
    if (!state.authUser) {
      log("Not logged in!");
      return false;
    }
    commit("loading", { profile: true });
    try {
      setTimeout(async () => {
        await fireStore
          .collection(usersCol)
          .doc(state.authUser.uid)
          .set(data, { merge: true });
      }, 2000);
    } catch (error) {
      commit("errorCatched", error, { root: true });
    }
  };

  return Object.freeze({
    changeUser,
    createUser,
    loginWithEmailPassword,
    logout,
    updateProfile
  });
};

const mutations = {
  loading(state, process) {
    state.loading = { ...state.loading, ...process };
    log("Loading", process);
  },
  userChanged(state, user) {
    state.authUser = user;
    log("User changed", user);
  },
  profileChanged(state, data) {
    state.profile = data;
    log("Profile changed", data);
  }
};

export default (fireAuth, fireStore, userApi) => ({
  namespaced: true,
  state,
  getters,
  actions: actions(fireAuth, fireStore, userApi),
  mutations
});
