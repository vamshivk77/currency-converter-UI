import '@testing-library/jest-dom';
import { mswServer } from './mock-api/msw-server';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());