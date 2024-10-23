import {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaDollarSign, FaClock, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';
import { formatTime } from '../helper';
import { AmountEntry, TimeEntry, Statistics } from '../constants/dataTypes';

const Home = () => {
  const user = useSelector((state: any) => state.user);
  const [statistics, setStatistics] = useState<Statistics>();
  const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');

  const fetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/entries/dashboard',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    if(data.success){
      setStatistics(data.statistics);
    }
  }

  useEffect(() => {
    if(user.isLoggedIn){
      fetchData();
    }
  }, [user.isLoggedIn]);

  return (
    !statistics? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Spinner animation="border" role="status" variant='success'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>:
    <Container className="py-5">
      <h1 className="text-center mb-5">Dashboard</h1>

      {/* Statistics */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <div className="stat-card bg-white p-4 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h6 className="text-muted m-0">Total Spent</h6>
              <div className="stat-icon bg-primary-subtle p-2 rounded-circle">
                <FaDollarSign size={24} className="text-primary" />
              </div>
            </div>
            <h2 className="display-5 fw-bold mb-0">₹{statistics.totalAmount}</h2>
            <p className="text-success mt-2 mb-0"><small>+100% from last month</small></p>
          </div>
        </Col>
        <Col md={6}>
          <div className="stat-card bg-white p-4 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h6 className="text-muted m-0">Total Time</h6>
              <div className="stat-icon bg-success-subtle p-2 rounded-circle">
                <FaClock size={24} className="text-success" />
              </div>
            </div>
            <h2 className="display-5 fw-bold mb-0">{formatTime(statistics.totalTime)}</h2>
            <p className="text-success mt-2 mb-0"><small>+100% from last month</small></p>
          </div>
        </Col>
      </Row>

      {/* Recent entries */}
      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <h4 className="mb-3">Recent Time Entries</h4>
          {statistics.recentTimeEntries.map((entry: TimeEntry, index: number) => (
            <Card key={index} className="mb-2 shadow-sm">
              <Card.Body className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0 fs-6">{entry.investedIn}</h6>
                    <small className="text-muted">{new Date(entry.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                  <div className="text-end">
                    <span className="badge bg-primary rounded-pill">{formatTime(entry.time)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          <h4 className="mb-3">Recent Amount Entries</h4>
          {statistics.recentAmountEntries.map((entry: AmountEntry, index: number) => (
            <Card key={index} className="mb-2 shadow-sm">
              <Card.Body className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0 fs-6">{entry.spentOn}</h6>
                    <small className="text-muted">{new Date(entry.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                    </div>
                  <div className="text-end">
                    <span className="badge bg-success rounded-pill">₹{entry.amount.toFixed(2)}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {/* Add new entry button */}
      <div className="text-center mt-5">
        <Button variant="primary" size="lg">
          <FaPlus className="me-2" /> Add New Entry
        </Button>
      </div>
    </Container>
  );
};

export default Home;