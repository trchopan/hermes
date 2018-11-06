export default [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "./containers/About.vue"),
    meta: { text: "About" }
  }
];
