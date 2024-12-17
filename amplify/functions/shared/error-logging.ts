/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Use Sentry here to log Backend errors
export function errorLogging(context: string) {
  return function (originalMethod: any, _context: any) {
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
