import { Schema } from "../../data/resource";

export const handler: Schema["exampleAPIForCallingALambdaFunction"]["functionHandler"] =
  async (event) => {
    console.log(event); // Event is where the Lambda Function arguments are passed in
    return "test";
  };
