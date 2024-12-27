import { errorLogging } from "../../../../amplify/functions/error/error-logging";

describe("errorLogging Decorator", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("should log method calls with context", async () => {
    class TestClass {
      @errorLogging("TestContext")
      testMethod(arg: string) {
        return `processed ${arg}`;
      }
    }

    const instance = new TestClass();
    const result = instance.testMethod("test");

    expect(result).toBe("processed test");
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain("TestContext");
  });
});
