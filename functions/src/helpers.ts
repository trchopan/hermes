import * as fetch from "isomorphic-fetch";
import { RECAPTCHA_SECRET } from "./secrets";

const RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";

export const logger = (className: string) => (
  message: string,
  ...objects: any[]
) => {
  console.log(className, message, ...objects);
};

export const reCaptchaPromise = async (response: string): Promise<any> => {
  const url = `${RECAPTCHA_URL}?secret=${RECAPTCHA_SECRET}&response=${response}`;
  return await fetch(url)
    .then(res => res.json())
    .catch(error => {
      logger("[helpers]")("ERROR", error);
      throw { code: "auth/server-error" };
    });
};
