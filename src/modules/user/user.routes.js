import User from "./User.vue";
import UserCreate from "./UserCreate.vue";

export default [
  {
    path: "/user",
    component: User,
    children: [
      { path: "create", component: UserCreate },
      { path: "", redirect: "/user/manage" },
      { path: "**", redirect: "/not-found" }
    ]
  }
];
