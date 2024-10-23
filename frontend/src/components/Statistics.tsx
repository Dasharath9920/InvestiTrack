import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Alert, Card, Col, Row, Container, Tabs, Tab } from 'react-bootstrap';

const spendingData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1100 },
  { month: 'Mar', amount: 1300 },
  { month: 'Apr', amount: 900 },
  { month: 'May', amount: 1500 },
  { month: 'Jun', amount: 1200 },
];

const spendingCategoryData = [
  { name: 'Food', value: 400 },
  { name: 'Rent', value: 800 },
  { name: 'Utilities', value: 200 },
  { name: 'Entertainment', value: 300 },
];

const timeData = [
  { day: 'Mon', hours: 8 },
  { day: 'Tue', hours: 7.5 },
  { day: 'Wed', hours: 8.5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 9 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 5 },
];

const timeCategoryData = [
  { name: 'Work', value: 40 },
  { name: 'Sleep', value: 56 },
  { name: 'Leisure', value: 25 },
  { name: 'Exercise', value: 5 },
  { name: 'Other', value: 42 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Statistics: React.FC = () => {
  return (
    <Container className="statistics-container">
      <h1 className="my-4">Personal Statistics</h1>
      
      <Tabs defaultActiveKey="spending" className="mb-4" fill>
        <Tab eventKey="spending" title="Spending">
          <SpendingStatistics />
        </Tab>
        <Tab eventKey="time" title="Time Usage">
          <TimeStatistics />
        </Tab>
      </Tabs>
    </Container>
  );
};

const SpendingStatistics: React.FC = () => {
  return (
    <>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Spent This Month</Card.Title>
              <Card.Text className="h2">$1,500</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Average Monthly Spending</Card.Title>
              <Card.Text className="h2">$1,200</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Predicted Next Month</Card.Title>
              <Card.Text className="h2">$1,350</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2>Spending Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={spendingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="mt-4">Spending by Category</h2>
      <Row>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {spendingCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <h2 className="mt-4">Alerts and Insights</h2>
      <Alert variant="warning">
        <Alert.Heading>Overspending Alert</Alert.Heading>
        <p>Your spending in the 'Entertainment' category is 20% higher than last month.</p>
      </Alert>
      <Alert variant="info">
        <Alert.Heading>Savings Opportunity</Alert.Heading>
        <p>You could save $50 per month by switching to a cheaper phone plan.</p>
      </Alert>
    </>
  );
};

const TimeStatistics: React.FC = () => {
  return (
    <>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Hours This Week</Card.Title>
              <Card.Text className="h2">51 hours</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Average Daily Hours</Card.Title>
              <Card.Text className="h2">7.3 hours</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Most Productive Day</Card.Title>
              <Card.Text className="h2">Friday</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2>Time Usage Over Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="hours" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="mt-4">Time Distribution by Category</h2>
      <Row>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={timeCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {timeCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <h2 className="mt-4">Insights and Recommendations</h2>
      <Alert variant="warning">
        <Alert.Heading>Work-Life Balance Alert</Alert.Heading>
        <p>Your work hours on Friday are 20% higher than your weekly average. Consider balancing your workload throughout the week.</p>
      </Alert>
      <Alert variant="info">
        <Alert.Heading>Productivity Tip</Alert.Heading>
        <p>You're most productive on Fridays. Consider scheduling important tasks for this day.</p>
      </Alert>
    </>
  );
};

export default Statistics;