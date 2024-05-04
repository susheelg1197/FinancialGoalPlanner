import React, { useState, useEffect } from 'react';
import BarChartFinance from './BarChartFinance';
import { getUserFinances } from '../../utils/api';

function YearlyFinancesChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchFinanceData(selectedYear);
  }, [selectedYear]);

  const fetchFinanceData = async (year) => {
    try {
      const token = localStorage.getItem('authToken');
      const data = await getUserFinances(token, year); // Assuming API can filter by year
      const monthlyFinances = new Array(12).fill(0); // Array to store finances for each month

      data.forEach(item => {
        const month = new Date(item.createdOn).getMonth(); // Get month index from date
        monthlyFinances[month] += item.amount; // Aggregate finances by month
      });

      setChartData({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        seriesData: monthlyFinances
      });

    } catch (error) {
      console.error('Error fetching finance data:', error);
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
        <BarChartFinance categories={chartData.categories} seriesData={chartData.seriesData} />
      )}
    </div>
  );
}

export default YearlyFinancesChart;
