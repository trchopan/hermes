import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config } from "@/firebase.conf";

firebase.initializeApp(config);
export const fireAuth = firebase.auth();
export const fireStore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
fireStore.settings(settings);

//
// export const vuefire = {
//   auth: fireAuth,
//   firestore: fireStore
// };
//
// Vue.mixin({
//   beforeCreate() {
//     const options = this.$options;
//     if (options.vuefire) this.$vuefire = options.vuefire;
//     else if (options.parent && options.parent.$vuefire)
//       this.$vuefire = options.parent.$vuefire;
//   }
// });
