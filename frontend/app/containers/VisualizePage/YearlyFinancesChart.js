import React, { useState, useEffect } from 'react';
import BarChartFinance from './BarChartFinance';
import { getUserFinances } from '../../utils/api';

function YearlyFinancesChart({ chartData }) {
  console.log("In yearl,", chartData)
  return (
      <div>
          {chartData.seriesData && chartData.seriesData.length > 0 && (
              <BarChartFinance categories={chartData.categories} seriesData={chartData.seriesData} />
          )}
      </div>
  );
}

export default YearlyFinancesChart;
