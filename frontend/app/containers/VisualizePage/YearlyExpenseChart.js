import React, { useState, useEffect } from 'react';
import BarChartExpense from './BarChartExpense';
import { getUserExpenses } from '../../utils/api';

function YearlyExpenseChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchExpenseData(selectedYear);
  }, [selectedYear]);

  const fetchExpenseData = async (year) => {
    try {
      const token = localStorage.getItem('authToken');
      const data = await getUserExpenses(token, year); // Assuming API can filter by year
      const monthlyExpenses = new Array(12).fill(0); // Array to store expenses for each month

      data.forEach(item => {
        const month = new Date(item.createdOn).getMonth(); // Get month index from date
        monthlyExpenses[month] += item.amount; // Aggregate expenses by month
      });

      setChartData({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        seriesData: monthlyExpenses
      });

    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      {/* <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select> */}
      {chartData.seriesData && (
        <BarChartExpense categories={chartData.categories} seriesData={chartData.seriesData} />
      )}
    </div>
  );
}

export default YearlyExpenseChart;
