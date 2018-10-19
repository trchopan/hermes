import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify/lib";
import { components, directives } from "./vuetify";
// import "vuetify/dist/vuetify.min.css";
import "vuetify/src/stylus/app.styl";

Vue.config.productionTip = false;
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

Vue.config.productionTip = false;
Vue.config.devtools = false;

// router.beforeEach(globalGuard(store));

Vue.use(Vuetify, { components, directives });

// store.dispatch("auth/init").then(() => {
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// });
