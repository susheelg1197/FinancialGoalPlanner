import React from 'react';
import Chart from 'react-apexcharts';

const CombinationChart = ({ expenses, targetAmount }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const expenseData = expenses.map(exp => exp.amount); // Assume expenses is an array of { month, amount }
  const cumulativeTarget = new Array(expenses.length).fill(targetAmount / 12).map((val, index) => (index + 1) * val);

  const options = {
    chart: {
      height: 350,
      type: 'line', // Main type is line, but we can add other types
    },
    stroke: {
      width: [0, 4] // Specifies the stroke width for each series (bar and line)
    },
    title: {
      text: 'Monthly Expenses and Target Comparison'
    },
    labels: months,
    xaxis: {
      type: 'category'
    },
    yaxis: [{
      title: {
        text: 'Expenses',
      },
    }, {
      opposite: true,
      title: {
        text: 'Target Amount'
      }
    }],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return `$${y.toFixed(2)}`;
          }
          return y;
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    series: [{
      name: 'Expenses',
      type: 'bar',
      data: expenseData
    }, {
      name: 'Target Amount',
      type: 'line',
      data: cumulativeTarget
    }]
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="line" height={350} />
    </div>
  );
};

export default CombinationChart;
