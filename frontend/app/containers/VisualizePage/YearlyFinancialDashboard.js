import React, { useState, useEffect } from 'react';
import YearDropdown from './YearDropdown'; // Assuming it's reusable for financials
import YearlyFinancesChart from './YearlyFinancesChart';
import { getUserFinancesByYear } from '../../utils/api'; // Assuming this API function is defined similarly to getUserExpensesByYear

function YearlyFinancialDashboard() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState({ categories: [], seriesData: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const financesData = await getUserFinancesByYear(token, selectedYear);
                    processFinanceData(financesData);
                }
            } catch (error) {
                console.error('Error fetching finance data:', error);
                processFinanceData([])
            }
        };

        fetchData();
    }, [selectedYear]);

    const processFinanceData = (data) => {
        const monthlyFinances = new Array(12).fill(0);
        data.forEach(item => {
            const month = new Date(item.createdOn).getMonth();
            monthlyFinances[month] += item.amount;
        });
        console.log("MF: ", monthlyFinances)
        setChartData({
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            seriesData: monthlyFinances
        });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        <div>
            <div className="heading">
                <h2>Yearly Financial Overview</h2>
                <YearDropdown selectedYear={selectedYear} onYearChange={handleYearChange} />
            </div>
            <YearlyFinancesChart chartData={chartData} />
        </div>
    );
}

export default YearlyFinancialDashboard;
