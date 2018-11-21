import SignUp from "./SignUp.vue";
import Login from "./Login.vue";
import Profile from "./Profile.vue";

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
