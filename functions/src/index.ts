import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { createUserHandler } from "./express-api/user";
import { onAuthDeleteHandler } from "./auth/auth-delete";

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
export const api = functions.https.onRequest(app);
