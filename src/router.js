import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound";
import { logger } from "@/helpers";

Vue.use(Router);

const log = logger("vue-router");
const checkMetaKey = (matched, key) => matched.some(record => record.meta[key]);

export const globalGuard = store => (to, from, next) => {
  if (
    store.state.auth.currentUser &&
    checkMetaKey(to.matched, "redirectHome")
  ) {
    log("redirectHome", to.name);
    next({ path: "/" });
    return;
  }

  if (
    !store.state.auth.currentUser &&
    checkMetaKey(to.matched, "requiresAuth")
  ) {
    log("requiresAuth", to.name);
    next({ path: "/login" });
    return;
  }

  next();
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { text: "Login" }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { text: "Home", requireAuth: true }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: { text: "About" }
    },
    {
      path: "**",
      name: "not-found",
      component: NotFound
    }
  ]
});
