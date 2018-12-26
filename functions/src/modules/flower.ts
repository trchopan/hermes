import automl from "@google-cloud/automl";
import { CallableContext } from "firebase-functions/lib/providers/https";

export async function flowerHandler(
  data: { imageBase64: string },
  context: CallableContext
) {
  console.log("data", data.imageBase64.slice(0, 100));
  const predictionClient = new automl.PredictionServiceClient();
  const requestBody = {
    name: predictionClient.modelPath(
      "hermes-7b876",
      "us-central1",
      "ICN3069629383106696154"
    ),
    payload: {
      image: {
        imageBytes: data.imageBase64.slice(22)
      }
    }
  };
  const result = await predictionClient.predict(requestBody).then(responses => {
    console.log("Got a prediction from AutoML API!", JSON.stringify(responses));
    return responses;
  });
  return { result, resBody: requestBody };
}
