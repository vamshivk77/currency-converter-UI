// MyComponent.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http  } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from './CurrencyConverter';



const server = setupServer(
  http.get('http://localhost:3000/exchange-rates', () => {
    console.log(HttpResponse.json())
     return HttpResponse.json()
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders data from API', async () => {
  render(<CurrencyConverter />);

  // Loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for the API call to complete
  await waitFor(() => screen.getByText('Data: Hello, testing!'));

  // Check if the component renders the data
  expect(screen.getByText('Data: Hello, testing!')).toBeInTheDocument();
});
