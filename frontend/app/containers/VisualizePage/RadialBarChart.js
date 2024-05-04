import React from 'react';
import Chart from 'react-apexcharts';

const RadialBarChart = ({ series, labels }) => {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '50%',
        },
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
            show: true,
            formatter: function (val) {
              return `$${val.toLocaleString()}`; // Format as dollar amount
            }
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return `$${total.toLocaleString()}`; // Sum and format as dollar amount
            }
          }
        }
      }
    },
    labels: labels,
    colors: ['#20E647', '#FF4560', '#775DD0', '#00E396'],
    stroke: {
      lineCap: 'round'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#87D4F9', '#FFB199', '#D9A7C7', '#D4FFEA'],
        inverseColors: true,
        stops: [0, 100]
      }
    }
  };

  return (
    <div>
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
