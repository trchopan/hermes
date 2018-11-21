export default [
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "./About.vue"),
    meta: { text: "About" }
  }
];
