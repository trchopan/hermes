import { logger } from "@/share/helpers.js";
import { profileParser } from "./auth.models.js";

const log = logger("[auth]");
const usersCol = "users";

const state = {
  authUser: null,
  profile: null,
  loading: false,
  error: null
};

const getters = {
  loading: state => state.loading,
  error: state => state.error
};

const actions = (fireAuth, fireStore) => {
  /**
   * This variable keeps track of firestore snapshot
   * Call it to unsubscribe to onSnapshot
   */
  let profileSnap;

};

const mutations = {
  loading(state) {
    state.loading = true;
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
