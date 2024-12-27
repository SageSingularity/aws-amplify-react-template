/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from "../../../../../amplify/functions/shared/clients/httpClient";

describe("HttpClient", () => {
  let httpClient: HttpClient;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Simple mock that returns a successful JSON response
    mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test response" }),
    });
    // Modify Node's global fetch to use our mock
    global.fetch = mockFetch;
    httpClient = new HttpClient("https://api.example.com");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should successfully make HTTP requests", async () => {
    const result = await httpClient.get<{ data: string }>("/test");

    expect(result).toEqual({ data: "test response" });
  });
});
