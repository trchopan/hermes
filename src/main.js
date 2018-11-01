/* eslint no-console: "off" */

import Vue from "vue";
import "./vuetify";
import "./components/global";
import "./filters";
import router, { globalGuard } from "./router";
import { Translation } from "./plugins/translation.js";
import store from "./store";
import { fireAuth } from "./firebase";
import App from "./App.vue";

Vue.config.productionTip = false;
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(Translation);
router.beforeEach(globalGuard(store));

let inited = false;

fireAuth.onAuthStateChanged(user => {
  const authUser = user ? { uid: user.uid, email: user.email } : null;
  store.dispatch("auth/changeUser", authUser);
  if (!inited) {
    init();
  }
});

const init = () => {
  inited = true;
  console.log(
    "%c App finished intializing",
    "background: black; color: white;"
  );
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
};
