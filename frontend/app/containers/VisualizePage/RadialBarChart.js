import React from 'react';
import Chart from 'react-apexcharts';

const RadialBarChart = () => {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
            show: true,
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 249
            }
          }
        }
      }
    },
    labels: ['Cricket', 'Football', 'Basketball', 'Hockey'],
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

  const series = [70, 55, 45, 60]; // This represents the percentage completion for each sport

  return (
    <div>
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
