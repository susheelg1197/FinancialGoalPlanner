import React, { useState, useEffect } from 'react';

function YearDropdown() {
    // State to store the selected year
    const [selectedYear, setSelectedYear] = useState('');

    // Array of years for the dropdown - Adjust the range as needed
    const years = Array.from(new Array(20), (val, index) => 2023 - index);

    // Function to handle year selection
    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        fetchApiData(year);
    };

    // Function to fetch data from the API
    const fetchApiData = (year) => {
        console.log(`Fetching data for year: ${year}`);
        // Replace URL with your actual API endpoint
        fetch(`https://api.example.com/data?year=${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle your data here
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Component JSX
    return (
        <div>
            <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Select a year</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
}

export default YearDropdown;
