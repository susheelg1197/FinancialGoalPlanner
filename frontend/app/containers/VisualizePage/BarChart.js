import React, { memo } from 'react';
import Chart from 'react-apexcharts'; // Importing ApexCharts component

function BarChart() {
  const options = {
    chart: {
      id: 'apexchart-bar'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
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
      text: 'Monthly Expenditure',
      align: 'center',

    }
  };

  const series = [{
    name: 'Sales',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default memo(BarChart);
