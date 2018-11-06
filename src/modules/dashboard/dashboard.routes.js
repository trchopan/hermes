import Dashboard from "./containers/Dashboard.vue";

export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  }
];
