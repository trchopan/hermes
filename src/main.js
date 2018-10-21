import Vue from "vue";
import App from "./App.vue";
import router, { globalGuard } from "./router";
import store from "./store";
import Vuetify from "vuetify/lib";
import { components, directives } from "./vuetify";
// import "vuetify/dist/vuetify.min.css";
import "vuetify/src/stylus/app.styl";
import { fireAuth } from "./firebase";

Vue.config.productionTip = false;
console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #ed1d24;");
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #159cd8;");

Vue.config.productionTip = false;
Vue.config.devtools = false;

router.beforeEach(globalGuard(store));

Vue.use(Vuetify, { components, directives });

let inited = false;

fireAuth.onAuthStateChanged(user => {
  const authUser = user ? { uid: user.uid, email: user.email } : null;
  store.dispatch("auth/changeUser", authUser);
  if (!inited) init();
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
