import * as crypto from "crypto";
import * as admin from "firebase-admin";
import { logger } from "../helpers";
import { ADMIN_SHA256 } from "../secrets";
import {
  CallableContext,
  HttpsError
} from "firebase-functions/lib/providers/https";

const API_NAME = "[user]";
const log = logger(API_NAME);

enum ErrorCode {
  wrongParams = "auth/wrong-params",
  wrongSecret = "auth/wrong-secret",
  cannotSetCustomClaims = "auth/cannot-set-custom-claims",
  failReCaptcha = "auth/fail-recaptcha",
  failCreateUser = "auth/fail-create-user",
  failInitUserProfile = "auth/fail-init-user-profile",
  failListUsers = "auth/fail-list-users",
  noUserFound = "auth/no-user-found",
  notAuthorized = "auth/not-authorized"
}

async function changeRole(
  uid: string,
  roleSettings: {
    admin?: boolean;
    manager?: boolean;
    worker?: boolean;
  }
) {
  return await admin
    .auth()
    .setCustomUserClaims(uid, roleSettings)
    .catch(error => {
      log("ERROR changeRole", error);
      throw { code: ErrorCode.cannotSetCustomClaims };
    });
}

export async function makeAdminHandler(
  data: { secret: string },
  context: CallableContext
) {
  log("request makeAdmin", data);

  try {
    if (!data.secret) {
      throw new HttpsError("invalid-argument", "", {
        code: ErrorCode.wrongParams
      });
    }
    const hash = crypto
      .createHash("sha256")
      .update(data.secret)
      .digest("base64");

    if (hash !== ADMIN_SHA256) {
      throw new HttpsError("permission-denied", "", {
        code: ErrorCode.wrongSecret
      });
    }

    await changeRole(context.auth.uid, { admin: true });

    return { success: true };
  } catch (error) {
    return error;
  }
}

export async function listUsersHandler(data: any, context: CallableContext) {
  log("request listUsers", data);

  try {
    if (context.auth.token.admin !== true) {
      throw new HttpsError("permission-denied", "", {
        code: ErrorCode.notAuthorized
      });
    }
    const result = await admin
      .auth()
      .listUsers()
      .catch(error => {
        log("ERROR listUsers", error);
        throw new HttpsError("unknown", "", { code: ErrorCode.failListUsers });
      });
    return {
      pageToken: result.pageToken,
      user: result.users.map(user => ({
        uid: user.uid,
        email: user.email,
        customClaims: user.customClaims
      }))
    };
  } catch (error) {
    return error;
  }
}

export async function makeManagerHandler(
  data: any,
  context: CallableContext
): Promise<any> {
  log("request changeUserRole ", data);

  try {
    if (context.auth.token.admin !== true) {
      throw new HttpsError("permission-denied", "", {
        code: ErrorCode.notAuthorized
      });
    }

    if (data.uid && typeof data.uid === "string") {
      throw new HttpsError("invalid-argument", "", {
        code: ErrorCode.wrongParams
      });
    }

    await changeRole(data.uid, { manager: true }).catch(error => {
      throw new HttpsError("unknown", "", error);
    });
    return { success: true };
  } catch (error) {
    return error;
  }
}
