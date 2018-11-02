import { logger } from "@/helpers.js";
import { usersCol } from "@/firebase.js";

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
  /**
   * This variable keeps track of firestore snapshot
   * Call itself to end the listening
   */
  let profileSnap;

  const changeUser = ({ commit }, user) => {
    commit("userChanged", user);
    if (!user) {
      commit("profileChanged", null);

      // Stop listening to profile snapshot change
      if (profileSnap) {
        profileSnap();
        profileSnap = undefined;
      }
    } else {
      log("Listening to user profile...");
      commit("loading");
      profileSnap = fireStore
        .collection(usersCol)
        .doc(user.uid)
        .onSnapshot(
          snapshot => {
            if (snapshot && snapshot.exists) {
              const data = snapshot.data();
              commit("profileChanged", data);
            } else {
              commit("errorCatched", { code: "auth/profile-not-found" });
            }
          },
          error => {
            commit("errorCatched", error);
          }
        );
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
      log("loginWithEmailPassword error");
      commit("errorCatched", error);
      return false;
    }
  };

  const logout = async ({ commit }) => {
    log("Logging out...");
    commit("loading");
    try {
      await fireAuth.signOut();
      return true;
    } catch (error) {
      log("logout error");
      commit("errorCatched", error);
      return false;
    }
  };

  const updateProfile = async ({ commit, state }, data) => {
    log("Updating profile...");
    if (!state.authUser) {
      log("Not logged in!");
      return false;
    }
    commit("loading");
    try {
      setTimeout(async () => {
        await fireStore
          .collection(usersCol)
          .doc(state.authUser.uid)
          .set(data, { merge: true });
        return true;
      }, 1000);
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  };

  return Object.freeze({
    changeUser,
    loginWithEmailPassword,
    logout,
    updateProfile
  });
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
    log("Profile changed", data);
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
