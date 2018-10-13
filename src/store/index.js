import Vue from "vue";
import Vuex from "vuex";
import auth, { parseFireAuth } from "./modules/auth";
import { fireAuth } from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth: auth(fireAuth, parseFireAuth) },
  strict: process.env.NODE_ENV !== "production"
});
