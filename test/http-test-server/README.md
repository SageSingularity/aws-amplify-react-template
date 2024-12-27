# HTTP Test Server

This is a simple HTTP server that can be used to test HTTP requests.

It is not used in automated tests, but can be useful for manual testing.

## Usage

```bash
node httpTestServer.js
```

Next, use the client of your choice to make requests to the server.

They will be logged to the console, for example:

```
node test/http-test-server/httpTestServer.js
Server running at http://localhost:3000/

POST /foo/bar
{
  'content-type': 'application/json',
  'user-agent': 'PostmanRuntime/7.43.0',
  accept: '*/*',
  'postman-token': '4f0bfe85-7828-4240-9e18-462946f88bab',
  host: 'localhost:3000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '27'
}
BODY: {
    "body": "Hello World"
}
```
