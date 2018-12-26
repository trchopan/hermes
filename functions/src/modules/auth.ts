import * as admin from "firebase-admin";
import { logger } from "../helpers";
import { UsersColletion } from "../collections";
import { UserRecord } from "firebase-functions/lib/providers/auth";
import { EventContext } from "firebase-functions";

const API_NAME = "[onAuth]";
const log = logger(API_NAME);

export function onAuthDeleteHandler(
  user: UserRecord,
  context: EventContext
): Promise<FirebaseFirestore.WriteResult> {
  log("delete", user.uid);
  return admin
    .firestore()
    .collection(UsersColletion)
    .doc(user.uid)
    .delete();
}

export function onAuthCreateHandler(user: UserRecord, context: EventContext) {
  log("create", user.uid);
  return admin
    .firestore()
    .collection(UsersColletion)
    .doc(user.uid)
    .set({ init: false });
}
