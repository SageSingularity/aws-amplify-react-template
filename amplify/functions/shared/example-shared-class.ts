import { errorLogging } from "../error/error-logging";

// Define methods, classes, and other shared code here.
// Error Handling: https://docs.amplify.aws/vue/build-a-backend/functions/error-handling/

/* Shared Class used by multiple Lambda functions.
 * @param {string} exampleArgument - An input string for our backend business logic.
 * @returns {string} - A string output from our backend business logic.
 * @throws {Error} If the input string is empty.
 */
export class exampleSharedClass {
  @errorLogging("Add some custom context here to help debug errors")
  async exampleSharedFunction(exampleArgument: string) {
    return `Hello, ${exampleArgument}!`;
  }
}
