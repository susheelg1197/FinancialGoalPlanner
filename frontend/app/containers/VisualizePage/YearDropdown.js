import React, { useState, useEffect } from 'react';

function YearDropdown({ selectedYear, onYearChange }) {
    const years = Array.from(new Array(20), (_, index) => new Date().getFullYear() - index);

    return (
        <select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
            {years.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
    );
}

export default YearDropdown;
