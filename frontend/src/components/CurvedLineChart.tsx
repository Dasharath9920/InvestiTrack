import { Line } from 'react-chartjs-2';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';  // Add this import at the top

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
import { Col, Stack } from 'react-bootstrap';

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
    labels: chartData.map((item: any) => item.date),
    datasets: [
      {
        label: category[0].toUpperCase() + category.slice(1) + `${category === 'time' ? ' in hours' : ''}`,
        data: chartData.map((item: any) => item.time),
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
        display: true,
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

  return <Stack direction='horizontal' gap={2} style={{ height: '250px', width: '100%', margin: 'auto' }}>
      <Col xs='auto'>
        <button 
          className="btn btn-link p-0" 
          style={{ color: 'rgba(53, 162, 235, 1)' }}
          onClick={() => {/* Add your prev handler here */}}
        >
          <BsChevronLeft size={32} />
        </button>
      </Col>

      <Col>
        <Line data={data} options={options} style={{height: '250px', width: '100%'}}/>
      </Col>

      <Col xs='auto'>
        <button 
          className="btn btn-link p-0"
          style={{ color: 'rgba(53, 162, 235, 1)' }}
          onClick={() => {/* Add your next handler here */}}
      >
          <BsChevronRight size={32} />
        </button>
      </Col>
    </Stack>
};

export default CurvedLineChart;
