import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyCnt43CwpP1kiZPWq5IL1F43gLSRDZ0Vdk",
  authDomain: "boba-prince.firebaseapp.com",
  databaseURL: "https://boba-prince.firebaseio.com",
  projectId: "boba-prince",
  storageBucket: "boba-prince.appspot.com",
  messagingSenderId: "1037108039121"
};

firebase.initializeApp(config);

export const fireStore = firebase.firestore();
export const fireAuth = firebase.auth();
