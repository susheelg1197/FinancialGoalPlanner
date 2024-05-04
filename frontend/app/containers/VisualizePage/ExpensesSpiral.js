import React, { useState, useEffect } from 'react';
import RadialBarChart from './RadialBarChart';
import { getUserExpenses } from '../../utils/api';

const ExpensesSpiral = () => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }
        const expenses = await getUserExpenses(token);
        processExpenses(expenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchAndProcessData();
  }, []);

  const processExpenses = (expenses) => {
    const categoryMap = {};
    expenses.forEach(expense => {
      const { category, amount } = expense;
      if (categoryMap[category]) {
        categoryMap[category] += amount;
      } else {
        categoryMap[category] = amount;
      }
    });

    const categories = Object.keys(categoryMap);
    const series = Object.values(categoryMap);
    console.log(categories);
    setCategories(categories);
    setSeries(series);
  };

  return (
    <div>
      {series.length > 0 && <RadialBarChart series={series} labels={categories} />}
    </div>
  );
};

export default ExpensesSpiral;
