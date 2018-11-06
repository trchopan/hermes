import Vue from "vue";
import Router from "vue-router";
import { logger } from "@/helpers";
import auth from "@/modules/auth/auth.routes.js";
import about from "@/modules/about/about.routes.js";
import home from "@/modules/home/home.routes.js";
import dashboard from "@/modules/dashboard/dashboard.routes.js";
import notFound from "@/modules/not-found/not-found.routes.js";

Vue.use(Router);

const log = logger("vue-router");
const checkMetaKey = (matched, key) => matched.some(record => record.meta[key]);

export const globalGuard = store => (to, from, next) => {
  if (!store.state.auth.authUser && checkMetaKey(to.matched, "requiresAuth")) {
    log("requiresAuth", to.name);
    next("/login");
    return;
  }

  if (store.state.auth.authUser && to.name === "login") {
    next("/");
    return;
  }

  // Always call next()
  next();
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [].concat(auth, about, home, dashboard, notFound)
});
