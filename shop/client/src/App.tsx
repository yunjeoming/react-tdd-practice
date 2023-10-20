import React, { useState } from 'react';
import './App.css';
import OrderPage from './pages/OrderPage';
import OrderContextProvider from './contexts/OrderContext';
import SummaryPage from './pages/SummaryPage';
import CompletePage from './pages/CompletePage';

function App() {
  const [step, setStep] = useState(0);

  return (
    <OrderContextProvider>
      {step === 0 && <OrderPage setStep={setStep} />}
      {step === 1 && <SummaryPage setStep={setStep} />}
      {step === 2 && <CompletePage setStep={setStep} />}
    </OrderContextProvider>
  );
}

export default App;
