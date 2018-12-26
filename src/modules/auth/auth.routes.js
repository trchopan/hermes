import SignUp from "./SignUp.vue";
import Login from "./Login.vue";
import LoginByPhone from "./LoginByPhone.vue";
import Profile from "./Profile.vue";

export default [
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/login",
    component: Login,
    children: [
      { path: "phone", name: "login-by-phone", component: LoginByPhone },
      { path: "", redirect: "./phone" },
      { path: "**", redirect: "/not-found" }
    ]
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true }
  }
];
