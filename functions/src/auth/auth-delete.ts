import * as admin from "firebase-admin";
import { logger } from "../helpers";
import { UsersColletion } from "../collections";

const API_NAME = "[onAuthDelete]";
const log = logger(API_NAME);

export function onAuthDeleteHandler(user) {
  log("Removing user profile", user.uid);
  return admin
    .firestore()
    .collection(UsersColletion)
    .doc(user.uid)
    .delete();
}
