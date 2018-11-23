import Vue from "vue";
import Vuex from "vuex";
import { fireAuth, fireStore } from "@/firebase";
import userApi from "@/api/user.api.js";
import auth from "@/modules/auth/auth.store.js";
import layout from "@/modules/core/layout.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout: layout,
    auth: auth(fireAuth, fireStore, userApi)
  },
  strict: process.env.NODE_ENV !== "production"
});
