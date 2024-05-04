import React from 'react';
import Chart from 'react-apexcharts';

const FinancialGoalChart = ({ expenses, savings, targetAmount }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  console.log("savings:: ", savings, "expenses:: ", expenses)
  // Generate cumulative data
  const cumulativeExpenses = expenses.reduce((acc, curr, index) => {
    if (index === 0) return [curr];
    acc.push(acc[index - 1] + curr);
    return acc;
  }, []);

  const cumulativeSavings = savings.reduce((acc, curr, index) => {
    if (index === 0) return [curr];
    acc.push(acc[index - 1] + curr);
    return acc;
  }, []);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    markers: {
      size: [0, 0, 5], // Size 0 for regular points, 5 for the target goal marker
      hover: {
        sizeOffset: 5
      }
    },
    annotations: {
      yaxis: [{
        y: targetAmount,
        borderColor: '#FF4560',
        label: {
          borderColor: '#FF4560',
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Target Goal'
        }
      }]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'Cumulative Expenses',
      data: cumulativeExpenses
    }, {
      name: 'Cumulative Savings',
      data: cumulativeSavings
    }],
    xaxis: {
      categories: months
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="line" height={350} />
    </div>
  );
};

export default FinancialGoalChart;
