// src/components/ExchangeRateComponent.tsx

import React, { useState } from 'react';
import axios from '../api/mock-currency-convertor-api';

interface IResponse {
  convertedAmount: number
  exchangeRate: number
}

const CurrencyConvertor: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("840");
  const [targetCurrency, setTargetCurrency] = useState("840");
  const [exchangeResponse, setExchangeResponse] = useState<IResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMandidateMessage, setErrorMandidateMessage] = useState("");


  const fetchExchangeRates = async () => {
    setErrorMessage("")
    setErrorMandidateMessage("")
    if (amount >= 1) {
      try {
        const response = await axios.get('/exchange-rates',
          {
            params: {
              sourceCurrency: sourceCurrency,
              targetCurrency: targetCurrency,
              amount: amount
            }
          }
        );
        setExchangeResponse(response.data);
        console.log(response)
      } catch (error: any) {
        setAmount(0)
        console.log(error?.response)
        setErrorMessage(error?.response?.data?.message ? error?.response?.data?.message : '')
      }
    } else {
      setErrorMandidateMessage("Please fill the amount")
    }

  };


  const handleSourceDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    setSourceCurrency(selectedCurrency);
  };

  const handleTargetDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    setTargetCurrency(selectedCurrency);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCurrency = parseFloat(event.target.value);
    setAmount(selectedCurrency);
  };
  return (
    <div className='convertor'>
      <div>
        <label htmlFor="sourceCurrency">Source
          Currency:</label>
        <select data-testid="select" onChange={handleSourceDropdownChange} id="sourceCurrency">
          <option data-testid="select-option" value="840">USD</option>
          <option data-testid="select-option" value="978">EUR</option>
          <option data-testid="select-option" value="356">INR</option>
          <option data-testid="select-option" value="392">JPY</option>
        </select>
        <label htmlFor="targetCurrency">Target Currency:</label>
        <select onChange={handleTargetDropdownChange} id="targetCurrency">
          <option value="840">USD</option>
          <option value="978">EUR</option>
          <option value="356">INR</option>
          <option value="392">JPY</option>
        </select>
      </div>
      <div >
        <label htmlFor="amount">Enter Amount:</label>
        <input value={amount} width={"100px"} min="0" onChange={handleInputChange} id="amount" type="number" />
        {errorMandidateMessage ? <div style={{ color: 'red' }}>{errorMandidateMessage}</div> : null}
      </div>
      <button onClick={() => fetchExchangeRates()}>Convert</button>
       <div data-testid="error" id='error' style={{ color: 'red' }}>{errorMessage}</div> 
      <div>
        <label htmlFor="convertedAmount">Converted Amount:</label>
        <span data-testid="convertedAmount" id="convertedAmount" style={{ backgroundColor: 'yellow' }}>{exchangeResponse?.convertedAmount}</span> 
      </div>

    </div>
  );
};

export default CurrencyConvertor;
