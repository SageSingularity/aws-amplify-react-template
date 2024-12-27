import { defineFunction } from "@aws-amplify/backend";

export const exampleConnectionToResourceUsingHTTP = defineFunction({
  name: "example-connection-to-resource-using-http",
  entry: "./handler.ts",
  timeoutSeconds: 5,
});
