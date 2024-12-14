// src/setupTests.ts
import "@testing-library/jest-dom";
// This adds custom matchers like 'toBeInTheDocument()'

// You can add global mocks here
global.fetch = jest.fn();

// You can extend Jest's expect
expect.extend({
  // Add custom matchers here
});

// You can add global setup code
beforeAll(() => {
  // Run before all tests
});

afterAll(() => {
  // Run after all tests
});
