import React, { useState, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import YearlyExpenseChart from './YearlyExpenseChart';
import { getUserExpensesByYear } from '../../utils/api';

function YearlyExpenditureDashboard() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({ categories: [], seriesData: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const expensesData = await getUserExpensesByYear(token, selectedYear);
                    processExpenseData(expensesData);
                }
            } catch (error) {
                console.error('Error fetching expenses data:', error);
                processExpenseData([])
            }
        };

        fetchData();
    }, [selectedYear]);

    const processExpenseData = (data) => {
        const monthlyExpenses = new Array(12).fill(0);
        data.forEach(item => {
            const month = new Date(item.createdOn).getMonth();
            monthlyExpenses[month] += item.amount;
        });
        setChartData({
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            seriesData: monthlyExpenses
        });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        <div>
        <div class="heading">
            <h2>Yearly Expenditure</h2>
            <YearDropdown selectedYear={selectedYear} onYearChange={handleYearChange} />
            </div>
            <YearlyExpenseChart chartData={chartData} />
        </div>
    );
}

export default YearlyExpenditureDashboard;
