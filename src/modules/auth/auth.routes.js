const SignUp = () => import(/* webpackChunkName: "auth" */ "./SignUp.vue");
const Login = () => import(/* webpackChunkName: "auth" */ "./Login.vue");
const Profile = () => import(/* webpackChunkName: "auth" */ "./Profile.vue");

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
