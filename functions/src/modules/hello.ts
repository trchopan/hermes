import { CallableContext } from "firebase-functions/lib/providers/https";

export async function helloHandler(
  data: { imageBase64: string },
  context: CallableContext
) {
  return { data: "hello there" };
}
