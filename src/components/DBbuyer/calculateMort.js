import React,{useState} from 'react';
import DashboardBuyer from './dbbuyer';

const CalculateMortgage = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // calculate monthly payment
  const calculateMonthlyPayment = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    // calculate monthly payment
    const monthlyPayment = (p * r) / (1 - Math.pow(1 + r, -n));
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 w-3/4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Mortgage Calculator</h2>
      <div className="mb-4">
        <label htmlFor="principal" className="block mb-1">Loan Amount ($)</label>
        <input type="number" id="principal" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={principal} onChange={(e) => setPrincipal(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label htmlFor="interestRate" className="block mb-1">Interest Rate (%)</label>
        <input type="number" id="interestRate" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label htmlFor="loanTerm" className="block mb-1">Loan Term (Years)</label>
        <input type="number" id="loanTerm" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}/>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={calculateMonthlyPayment}>Calculate</button>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Monthly Payment:</h3>
        <p className="text-2xl">${monthlyPayment}</p>
      </div>
    </div>
  );
};

const viewMortBP = () => {
  
    return (
      <div id='viewA' className='flex'>
        <DashboardBuyer/>
        <CalculateMortgage/>
      </div>
    );
  };
export default viewMortBP;