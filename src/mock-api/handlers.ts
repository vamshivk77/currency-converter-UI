
import { rest } from 'msw';
import '@testing-library/jest-dom/extend-expect';


export let mockRates = {
  convertedAmount:
    0.19191555715485187,
  exchangeRate: 1
}

export const converterHandler=
  rest.get('http://localhost:3000/exchange-rates?sourceCurrency=356&targetCurrency=840&amount=16', async (req, res, ctx) => {
    console.log("ctx.json(mockRates)",req)
  res(ctx.json(mockRates))
  })
export const converterHandlerException = rest.get(
  'http://localhost:3000/exchange-rates?sourceCurrency=392&targetCurrency=840&amount=16',
  async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Does not exist. Please try another currency' }))
);

export const handlers = [converterHandler];