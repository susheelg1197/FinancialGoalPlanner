import React, { useState, useEffect } from 'react';
import FinancialGoalChart from './FinancialGoalChart'; // Ensure this component is imported correctly
import { getUserExpenses, getUserFinances } from '../../utils/api'; // Adjust these imports according to your project structure

const FinancialGoalParent = () => {
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [targetAmount, setTargetAmount] = useState(24000); // Assuming a static target amount, could be dynamic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('Authentication token not found.');
          return;
        }

        const expensesData = await getUserExpenses(token);
        const financeData = await getUserFinances(token);

        processExpenses(expensesData);
        processFinance(financeData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, []);

  const processExpenses = (data) => {
    // Assuming each data item contains an 'amount' and a 'month'
    const processedExpenses = new Array(12).fill(0);
    data.forEach(item => {
      const monthIndex = new Date(item.createdOn).getMonth(); // convert date to month index
      processedExpenses[monthIndex] += item.amount;
    });
    setExpenses(processedExpenses);
  };

  const processFinance = (data) => {
    // Assuming finance data includes 'amountSaved' and 'createdOn'
    const processedSavings = new Array(12).fill(0);
    data.forEach(item => {
      const monthIndex = new Date(item.createdOn).getMonth(); // convert date to month index
      processedSavings[monthIndex] += item.amount; // or however the saving data is structured
    });
    setSavings(processedSavings);
  };

  return (
    <div>
      <FinancialGoalChart expenses={expenses} savings={savings} targetAmount={targetAmount} />
    </div>
  );
};

export default FinancialGoalParent;
