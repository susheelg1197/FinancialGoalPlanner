import React, { memo } from 'react';
import Chart from 'react-apexcharts'; 

function BarChartFinance({ categories, seriesData }) {
  const options = {
    chart: {
      id: 'apexchart-bar'
    },
    xaxis: {
      categories: categories
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    title: {
      text: 'Monthly Finances',
      align: 'center',
    }
  };

  const series = [{
    name: 'Finances',
    data: seriesData
  }];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default memo(BarChartFinance);
