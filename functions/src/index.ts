import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import {
  makeManagerHandler,
  makeAdminHandler,
  listUsersHandler
} from "./modules/user";
import { onAuthDeleteHandler, onAuthCreateHandler } from "./modules/auth";
import { flowerHandler } from "./modules/flower";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Auth
export const onAuthCreate = functions.auth.user().onCreate(onAuthCreateHandler);
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
// app.post("/api/user/makeAdmin", makeAdminHandler);
export const api = functions.https.onRequest(app);

// OnCalls
export const makeAdmin = functions.https.onCall(makeAdminHandler);
export const makeManager = functions.https.onCall(makeManagerHandler);
export const listUsers = functions.https.onCall(listUsersHandler);
export const flowerImage = functions.https.onCall(flowerHandler);