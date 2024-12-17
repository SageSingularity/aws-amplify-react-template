/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { exampleLambdaFunction } from "../functions/example-lambda-function/resource";
// Documentation for this file: https://docs.amplify.aws/vue/build-a-backend/data/
const schema = a.schema({
  // GraphQL Query/Mutation: Call a Lambda Function with arguments. This IaC will create
  // an API you can call from your frontend.
  exampleAPIForCallingALambdaFunction: a
    .query() // Change to Mutation() if you want to create, update, or delete data
    .arguments({
      argumentOne: a.string(), // Customize arguments
      argumentTwo: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(exampleLambdaFunction))
    .authorization((allow: { publicApiKey: () => any }) => [
      allow.publicApiKey(),
    ]), // Customize authorization

  // DynamoDB Table: Each table gets its own .model() IaC definition.
  // You can also create relational fields:
  // TODO: Replace Todo table with your data
  Todo: a
    .model({
      content: a.string(), // Customize fields
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]), // Anyone can read
      allow.owner().to(["read", "create", "delete"]), // Only the owner can read, create, or delete
    ]),
  // Feature Flags: Control Features in Production via Boolean Flags
  // The data in this table should be managed in the Amplify Console.
  FeatureFlags: a
    .model({
      name: a.string().required(), // e.g., "enableArtistSearch"
      isEnabled: a.boolean().required(),
      description: a.string(),
      environment: a.string(), // e.g., "dev", "staging", "prod"
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]), // Everyone can read
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
