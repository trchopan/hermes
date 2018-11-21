import NotFound from "./NotFound.vue";

export default [
  { path: "/not-found", name: "not-found", component: NotFound },
  { path: "**", redirect: "/not-found" }
];
