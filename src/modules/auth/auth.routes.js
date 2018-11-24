import Login from "./Login.vue";
import Profile from "./Profile.vue";

const SignUp = () => import(/* webpackChunkName: "sign-up" */ "./SignUp.vue");

export default [
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true }
  }
];
