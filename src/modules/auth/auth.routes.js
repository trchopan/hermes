import Login from "./containers/Login.vue";
import Profile from "./containers/Profile.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { text: "Login" }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true }
  }
];
