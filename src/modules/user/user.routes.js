const User = () => import(/* webpackChunkName: "user" */ "./User.vue");
const SearchUser = () =>
  import(/* webpackChunkName: "user" */ "./SearchUser.vue");
const MakeMeKing = () =>
  import(/* webpackChunkName: "user" */ "./MakeMeKing.vue");

export default [
  {
    path: "/user",
    component: User,
    children: [
      { path: "search", component: SearchUser },
      { path: "makeKing", component: MakeMeKing },
      { path: "", redirect: "/user/search" },
      { path: "**", redirect: "/not-found" }
    ]
  }
];
