# Sage's AWS Amplify React+Vite Starter Template

This template serves as a starting point for rapid MVP development using AWS Amplify.

# Quickstart

Install dependencies:

```
npm install
```

Follow the AWS Amplify [Quickstart](https://docs.amplify.aws/react/start/quickstart/) guide to setup local development.

You need an AWS account, and the ability to setup your own AWS Amplify App.

This app will serve as your learning platform, and to support creating cloud sandboxes.

# Typescript

The primary language of this template is Typescript (backend & frontend) and React (frontend).

## Running Individual Typescript Files

Sometimes it can be helpful to run a single typescript file.

To do this, you can use the following command:

```
npx tsx /path/to/file/fileToRun.ts
```

If for some reason tsx isn't installed:

```
npm i -D tsx
```

# Testing

This template includes a strategy for testing using Jest.

The `/test` directory contains both frontend and backend tests.

To run all tests:

```
npm run test
```

To run a single test file:

```
npm run test /path/to/test/file.test.ts
```

## Behavior Driven Development

When working with a team or a client, behavior driven development is a great way to ensure that the code matches user requirements.

# Deploying to AWS

For detailed instructions on deploying your application, refer to the [AWS Amplify deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws).

# Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

# License

This library is licensed under the MIT-0 License. See the LICENSE file.
