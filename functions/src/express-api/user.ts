import * as crypto from "crypto";
import * as admin from "firebase-admin";
import { logger, reCaptchaPromise } from "../helpers";
import { ADMIN_SHA256 } from "../secrets";
import { UsersColletion } from "../collections";
import { Request, Response } from "express";
import { CallableContext } from "firebase-functions/lib/providers/https";

const API_NAME = "[user]";
const log = logger(API_NAME);

enum ErrorCode {
  wrongParams = "auth/wrong-params",
  wrongSecret = "auth/wrong-secret",
  cannotSetCustomClaims = "auth/cannot-set-custom-claims",
  failReCaptcha = "auth/fail-recaptcha",
  failCreateUser = "auth/fail-create-user",
  failInitUserProfile = "auth/fail-init-user-profile",
  noUserFound = "auth/no-user-found",
  notAuthorized = "auth/not-authorized"
}

async function changeRole(
  uid: string,
  roleSettings: {
    admin?: boolean;
    manager?: boolean;
    worker?: boolean;
    customer?: boolean;
  }
) {
  return await admin
    .auth()
    .setCustomUserClaims(uid, roleSettings)
    .catch(error => {
      log("ERROR", error);
      throw { code: ErrorCode.cannotSetCustomClaims };
    });
}

export async function createUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  log("request createUser", req.body);

  try {
    if (!req.params.response || !req.params.email || !req.params.password) {
      throw { code: ErrorCode.wrongParams };
    }
    const recapthcResult = await reCaptchaPromise(req.body.response);
    if (!recapthcResult.success) {
      throw { code: ErrorCode.failReCaptcha };
    }

    const user = await admin
      .auth()
      .createUser({ email: req.body.email, password: req.body.password })
      .catch(error => {
        log("ERROR", error);
        throw { code: ErrorCode.failCreateUser };
      });

    await changeRole(user.uid, { customer: true });

    await admin
      .firestore()
      .collection(UsersColletion)
      .doc(user.uid)
      .set({ inited: false })
      .catch(error => {
        log("ERROR", error);
        throw { code: ErrorCode.failInitUserProfile };
      });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json(error);
  }
}

export async function makeAdminHandler(req: Request, res: Response) {
  log("request makeAdmin", req.params);

  try {
    if (!req.params.secret || !req.params.email) {
      throw { code: ErrorCode.wrongParams };
    }
    const hash = crypto
      .createHash("sha256")
      .update(req.params.secret)
      .digest("base64");
    if (hash !== ADMIN_SHA256) {
      log("hash is", hash);
      throw { code: ErrorCode.wrongSecret };
    }

    const user = await admin
      .auth()
      .getUserByEmail(req.params.email)
      .catch(error => {
        log("ERROR", error);
        throw { code: ErrorCode.noUserFound };
      });

    await changeRole(user.uid, { admin: true });

    return res.status(200).json({ success: true });
  } catch (error) {
    log("ERROR", error);
    return res.status(400).json(error);
  }
}

export async function listUsers(data: any, context: CallableContext) {
  log("request listUsers", data);

  try {
    if (context.auth.token.admin !== true) {
      throw { code: ErrorCode.notAuthorized };
    }
    await admin.auth().listUsers(50);
  } catch (error) {
    return error;
  }
}

export async function changeUserRoleByEmailHandler(
  data: any,
  context: CallableContext
): Promise<any> {
  log("request changeUserRole ", data);

  try {
    if (!data.email || typeof data.email !== "string") {
      throw { code: ErrorCode.wrongParams };
    }
    if (context.auth.token.admin !== true) {
      throw { code: ErrorCode.notAuthorized };
    }

    const user = await admin
      .auth()
      .getUserByEmail(data.email)
      .catch(error => {
        log("ERROR", error);
        throw { code: ErrorCode.noUserFound };
      });

    await changeRole(user.uid, data.roleSettings);
    return { success: true };
  } catch (error) {
    return error;
  }
}
