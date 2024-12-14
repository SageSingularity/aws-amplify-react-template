import { defineFunction } from "@aws-amplify/backend";

export const exampleLambdaFunction = defineFunction({
  name: "example-lambda-function",
  entry: "./handler.ts",
  timeoutSeconds: 5,
});
