// CurrencyConverter.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';


test('renders currency converter with default values', () => {
  render(<CurrencyConverter />);

  const amountInput = screen.getByLabelText(/Amount:/i);
  const sourceCurrency = screen.getByLabelText(/Source Currency:/i);
  const targetCurrency = screen.getByText(/Converted Amount:/i);

  expect(amountInput).toHaveValue(0);
  expect(sourceCurrency).toHaveValue('USD');
  expect(targetCurrency).toHaveValue('USD');
});

