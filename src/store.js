import Vue from "vue";
import Vuex from "vuex";
import { fireAuth, fireStore, fireFunctions } from "@/firebase.js";
import auth from "@/modules/auth/auth.store.js";
import user from "@/modules/user/user.store.js";
import { rootStore } from "@/modules/core/root.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth(fireAuth, fireStore),
    user: user(fireFunctions)
  },
  state: rootStore.state,
  getters: rootStore.getters,
  actions: rootStore.actions,
  mutations: rootStore.mutations,
  strict: process.env.NODE_ENV !== "production"
});
