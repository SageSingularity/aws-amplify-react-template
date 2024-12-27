import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { exampleLambdaFunction } from "./functions/example-lambda-function/resource";
import { exampleConnectionToResourceUsingHTTP } from "./functions/example-connection-to-resource-using-http/resource";

defineBackend({
  auth,
  data,
  exampleLambdaFunction,
  exampleConnectionToResourceUsingHTTP,
});
