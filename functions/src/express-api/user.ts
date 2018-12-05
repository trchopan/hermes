import * as admin from "firebase-admin";
import * as fetch from "isomorphic-fetch";
import { logger } from "../helpers";
import { RECAPTCHA_SECRET } from "../secrets";
import { UsersColletion } from "../collections";
import { Request, Response } from "express";

const RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";
const API_NAME = "[createUser]";
const log = logger(API_NAME);

export async function createUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  log("request createUser", req.body);

  try {
    const url = `${RECAPTCHA_URL}?secret=${RECAPTCHA_SECRET}&response=${
      req.body.response
    }&remoteip=${req.connection.remoteAddress}`;
    const result = await fetch(url).then(response => response.json());
    if (!result.success) {
      throw { code: "fail-recaptcha" };
    }

    const user = await admin
      .auth()
      .createUser({ email: req.body.email, password: req.body.password });

    await admin
      .firestore()
      .collection(UsersColletion)
      .doc(user.uid)
      .set({ inited: false });

    return res.status(200).json({ success: true });
  } catch (error) {
    log("ERROR", error);
    return res.status(400).json({ code: "auth/createUser" });
  }
}
