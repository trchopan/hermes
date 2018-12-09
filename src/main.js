/* eslint no-console: "off" */

import Vue from "vue";
import "./vuetify";
import "./filters.js";
import "./share";
import Translate from "./plugins/translate.js";
import router, { globalGuard } from "./router";
import store from "./store";
import { fireAuth } from "./firebase";
import App from "@/modules/core/App.vue";

Vue.config.productionTip = false;
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(Translate);

router.beforeEach(globalGuard(store));

let inited = false;

fireAuth.onAuthStateChanged(async user => {
  const role = await user
    .getIdTokenResult()
    .then(idToken => {
      return {
        admin: idToken.claims.admin ? true : false,
        manager: idToken.claims.manager ? true : false,
        worker: idToken.claims.worker ? true : false,
        customer: idToken.claims.customer ? true : false
      };
    })
    .catch(error => {
      console.log("init err", error);
      return {
        admin: false,
        manager: false,
        worker: false,
        customer: false
      };
    });
  const authUser = user ? { uid: user.uid, email: user.email, role } : null;
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
