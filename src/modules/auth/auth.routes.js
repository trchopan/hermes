import { SignUp } from "./containers/SignUp";
import { Login, LoginByPhone } from "./containers/Login";
import { Profile } from "./containers/Profile";

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
