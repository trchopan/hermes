import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound";
import { logger } from "@/helpers";

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
      meta: { text: "Home" }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true }
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
