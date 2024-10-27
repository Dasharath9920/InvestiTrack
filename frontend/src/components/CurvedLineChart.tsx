import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

// Register required components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CurvedLineChart = ({chartData, category, timePeriod}: {chartData: any, category: string, timePeriod: any}) => {
  // Chart data
  if(!chartData || !category) return null;
  const data = {
    labels: chartData.map((item: any) => category === 'time' ? item.investedIn : item.spentOn),
    datasets: [
      {
        label: category[0].toUpperCase() + category.slice(1) + `${category === 'time' ? ' in hours' : ''}`,
        data: chartData.map((item: any) => category === 'time' ? item.totalTime/60 : item.totalAmount),
        fill: true,
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderColor: 'rgba(53, 162, 235, 1)',
        tension: 0.4,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: false,
        text: `${category.charAt(0).toUpperCase() + category.slice(1)} Spent in ${timePeriod.label}`,
      },
    },
    scales: {
      x: {
         grid: {
           display: false,
         },
       },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <div style={{ height: '250px', width: '100%', margin: 'auto' }}>
      <Line data={data} options={options} style={{height: '100%', width: '90%'}}/>
   </div>
};

export default CurvedLineChart;
