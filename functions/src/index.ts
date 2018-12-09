import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import {
  createUserHandler,
  changeRoleByEmailHandler,
  makeAdminHandler,
  listUsersHandler
} from "./modules/user";
import { onAuthDeleteHandler } from "./modules/auth";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Auth
export const onAuthDelete = functions.auth.user().onDelete(onAuthDeleteHandler);

// Firestore

// Express API
const app = express();
// app.use(cors({ origin: [/localhost/, /example\.com/] }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.post("/api/user/create", createUserHandler);
app.get("/secret/makeAdmin/:secret/:email", makeAdminHandler);
export const api = functions.https.onRequest(app);

// OnCalls
export const changeRoleByEmail = functions.https.onCall(
  changeRoleByEmailHandler
);
export const listUsers = functions.https.onCall(listUsersHandler);
