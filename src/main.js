import Vue from "vue";
import App from "./App.vue";
import router, { globalGuard } from "./router";
import store from "./store";
import { Vuetify } from "vuetify";
import { components, directives } from "./vuetify";
import "vuetify/src/stylus/app.styl";

Vue.config.productionTip = false;
console.log("version", process.env.VUE_APP_VERSION);
console.log("author", process.env.VUE_APP_AUTHOR);

Vue.config.productionTip = false;
Vue.config.devtools = false;

router.beforeEach(globalGuard(store));
Vue.use(Vuetify, { components, directives });

store.dispatch("auth/init").then(() =>
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
);
