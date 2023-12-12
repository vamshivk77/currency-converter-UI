
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

let exchangeRates: any = {
  "840": 1,
  "978": 0.93,
  "356": 83.37
}

const convertCurrency = (fromCurrency: string, toCurrency: string, amount: any) => {
  // Convert the amount
  const totalAmount: number = amount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
  const exchangeRate: number = exchangeRates[toCurrency]
  return { totalAmount, exchangeRate }
}


mock.onGet('/exchange-rates').reply((config:any) => {
  console.log(config.params)
  const base = config.params;
  const { exchangeRate, totalAmount } = convertCurrency(base.sourceCurrency, base.targetCurrency, base.amount)
  if (base.sourceCurrency in exchangeRates && base.targetCurrency in exchangeRates) {
    return [200, { exchangeRate: exchangeRate, convertedAmount: totalAmount }]
  }
  return [500, { message: "Does not exist. Please try another currency" }]
});

export default axios;
