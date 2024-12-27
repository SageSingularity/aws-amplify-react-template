/**
 * Type for HTTP request methods
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * Configuration options for HTTP requests
 */
export interface RequestConfig<T> {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: T;
  params?: Record<string, string>;
}

/**
 * Error class for HTTP request failures
 */
export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public statusText: string,
    public response: unknown
  ) {
    super(`HTTP Error ${statusCode}: ${statusText}`);
    this.name = "HttpError";
  }
}

/**
 * HTTP Client for making REST API calls
 */
export class HttpClient {
  constructor(private baseUrl: string) {}

  /**
   * Makes an HTTP request
   * @template TData Type of the request body
   * @template TResponse Type of the expected response
   * @param endpoint API endpoint
   * @param config Request configuration
   * @returns Promise with the response data
   * @throws HttpError if the request fails
   */
  private async request<TData, TResponse>(
    endpoint: string,
    config: RequestConfig<TData>
  ): Promise<TResponse> {
    const url = new URL(endpoint, this.baseUrl);

    // Add query parameters if they exist
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url, {
      method: config.method,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    if (!response.ok) {
      throw new HttpError(
        response.status,
        response.statusText,
        await response.json().catch(() => null)
      );
    }

    return response.json();
  }

  /**
   * Performs a GET request
   * @template TResponse Expected response type
   * @param endpoint API endpoint
   * @param params Query parameters
   * @param headers Custom headers
   */
  async get<TResponse>(
    endpoint: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<never, TResponse>(endpoint, {
      method: "GET",
      params,
      headers,
    });
  }

  /**
   * Performs a POST request
   * @template TData Request body type
   * @template TResponse Expected response type
   * @param endpoint API endpoint
   * @param data Request body
   * @param headers Custom headers
   */
  async post<TData, TResponse>(
    endpoint: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TData, TResponse>(endpoint, {
      method: "POST",
      body: data,
      headers,
    });
  }

  /**
   * Performs a PUT request
   * @template TData Request body type
   * @template TResponse Expected response type
   * @param endpoint API endpoint
   * @param data Request body
   * @param headers Custom headers
   */
  async put<TData, TResponse>(
    endpoint: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TData, TResponse>(endpoint, {
      method: "PUT",
      body: data,
      headers,
    });
  }

  /**
   * Performs a DELETE request
   * @template TResponse Expected response type
   * @param endpoint API endpoint
   * @param headers Custom headers
   */
  async delete<TResponse>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<never, TResponse>(endpoint, {
      method: "DELETE",
      headers,
    });
  }

  /**
   * Performs a PATCH request
   * @template TData Request body type
   * @template TResponse Expected response type
   * @param endpoint API endpoint
   * @param data Request body
   * @param headers Custom headers
   */
  async patch<TData, TResponse>(
    endpoint: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    return this.request<TData, TResponse>(endpoint, {
      method: "PATCH",
      body: data,
      headers,
    });
  }
}

// Export a singleton instance
export const httpClient = new HttpClient(process.env.API_BASE_URL || "");
