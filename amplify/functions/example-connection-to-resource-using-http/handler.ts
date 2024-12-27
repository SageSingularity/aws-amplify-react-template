import { Schema } from "../../data/resource";
import { HttpClient } from "../shared/clients/httpClient";

export const handler: Schema["exampleConnectionToResourceUsingHTTP"]["functionHandler"] =
  async (event) => {
    // Use URL to your resource
    const httpClient = new HttpClient("https://api.example.com");

    // Make a POST request to your resource and explicitly type the response
    const response = await httpClient.post<{ body?: string | null }, string>(
      "/test",
      {
        body: event.arguments?.body,
      }
    );

    // Ensure we return string | null
    return response;
  };
