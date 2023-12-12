import { render, screen, waitFor } from '@testing-library/react';
import { converterHandler, converterHandlerException } from '../mock-api/handlers';
import { mswServer } from '../mock-api/msw-server';
import CurrencyConverter from './CurrencyConverter';

let mockRates = {
  convertedAmount:
    0.19191555715485187,
  exchangeRate: 1
}
describe('Component: CurrencyConverter', () => {
  it('displays returned tasks on successful fetch', async () => {
    mswServer.use(converterHandler);
    render(<CurrencyConverter />);
    const displayedAmount = await  screen.findByTestId("convertedAmount");
     expect(displayedAmount).toHaveStyle("background-color:yellow");
  });

  it('displays error message when fetching tasks raises error', async () => {
    mswServer.use(converterHandlerException);
    render(<CurrencyConverter />);

    const errorDisplay = await screen.findByTestId('error');
  
    expect(errorDisplay).toHaveStyle("color: red");
  });
});