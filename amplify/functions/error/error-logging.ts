/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Use Sentry here to log Backend errors
/**
 * A decorator function that provides error logging functionality for class methods.
 * It wraps the original method and logs method execution details including:
 * - Method name
 * - Timestamp
 * - Number and details of arguments
 * - Provided context
 * - Any errors that occur during execution
 *
 * @param context - A string providing additional context for the logging
 * @returns A decorator function that can be applied to class methods
 *
 * @example
 * ```typescript
 * class MyService {
 *   @errorLogging('UserAuthentication')
 *   async login(username: string, password: string) {
 *     // Method implementation
 *   }
 * }
 * ```
 *
 * @remarks
 * This is a temporary implementation. Future versions will integrate with Sentry
 * for proper error tracking and monitoring in production environments.
 */
export function errorLogging(context: string) {
  return function (originalMethod: any) {
    function replacementMethod(this: any, ...args: any[]) {
      const methodName = originalMethod?.name || "anonymous";

      console.log(
        `\nMethod Call Details:
==================
Method Name: ${methodName}
Timestamp: ${new Date().toISOString()}
Number of Arguments: ${args.length}

Arguments Details:
----------------
${args.map((arg, index) => `Argument ${index}: ${arg}`).join("\n")}

Context:
${context || "No context provided"}
==================\n`
      );

      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        console.error(`
Error in method ${methodName}:
${error}
`);
        throw error;
      }
    }
    return replacementMethod;
  };
}
