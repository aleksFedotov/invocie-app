// Polyfill "window.fetch" used in the React component.
import 'next';

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom';

import { server } from './mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
