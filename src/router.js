import Vue from "vue";
import Router from "vue-router";
import InitPage from "./views/InitPage.vue";
import Home from "./views/Home.vue";
// import About from "./views/About.vue";
import Login from "./views/Login.vue";
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
      path: "/init",
      name: "init",
      component: InitPage
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { redirectHome: true }
    },
    {
      path: "/about",
      name: "about",
      // component: About
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
