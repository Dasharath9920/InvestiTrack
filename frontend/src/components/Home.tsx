import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Spinner, ProgressBar } from 'react-bootstrap';
import { FaRupeeSign, FaClock, FaChartLine, FaChartPie } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';
import { formatTime } from '../helper';
import { AmountEntry, TimeEntry, Statistics } from '../constants/dataTypes';

const Home = () => {
  const user = useSelector((state: any) => state.user);
  const [statistics, setStatistics] = useState<Statistics>();
  const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
  const fetchedRef = useRef(false);
  const fetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/entries/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    if (data.success) {
      setStatistics(data.statistics);
    }
  }

  useEffect(() => {
    if (user.isLoggedIn && !fetchedRef.current) {
      fetchData();
      fetchedRef.current = true;
    }
  }, [user.isLoggedIn]);

  return (
    !statistics ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" role="status" variant='success'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div> :
      <Container className="py-3">
        <h1 className="text-center mb-5">Dashboard</h1>

        {/* Statistics */}
        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="stat-card bg-white p-4 rounded-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="text-muted m-0">Total Spent</h6>
                <div className="stat-icon bg-primary-subtle p-2 rounded-circle">
                  <FaRupeeSign size={24} className="text-primary" />
                </div>
              </div>
              <h2 className="display-8 fw-bold mb-0">₹{statistics.totalAmount}</h2>
              <p className="text-success mt-2 mb-0"><small>+100% from last month</small></p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card bg-white p-4 rounded-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="text-muted m-0">Total Time</h6>
                <div className="stat-icon bg-success-subtle p-2 rounded-circle">
                  <FaClock size={24} className="text-success" />
                </div>
              </div>
              <h2 className="display-8 fw-bold mb-0">{formatTime(statistics.totalTime)}</h2>
              <p className="text-success mt-2 mb-0"><small>+100% from last month</small></p>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card bg-white p-4 rounded-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-muted m-0">Progress</h6>
                <div className="stat-icon bg-warning-subtle p-2 rounded-circle">
                  <FaChartLine size={24} className="text-warning" />
                </div>
              </div>
              <ProgressBar now={60} label={`${60}%`} className="mb-3" />
              <p className="text-success mt-2 mb-0"><small>60% of goal achieved</small></p>
            </div>
          </Col>
        </Row>

        {/* Insights and Reports */}
        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <FaChartPie className="me-2" /> Recent Time Entries
              </Card.Header>
              <Card.Body>
                {statistics.recentTimeEntries.map((entry: TimeEntry, index: number) => (
                    <Card key={index} className="mb-2 shadow-sm">
                      <Card.Body className="py-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 fs-6">{entry.investedIn} {entry.otherCategory && `(${entry.otherCategory})`}</h6>
                            <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                              <em>{new Date(entry.activityDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</em>
                            </small>                          </div>
                          <div className="text-end">
                            <span className="badge bg-primary rounded-pill">{formatTime(entry.time)}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <FaChartLine className="me-2" /> Recent Amount Entries
              </Card.Header>
              <Card.Body>
                {statistics.recentAmountEntries.map((entry: AmountEntry, index: number) => (
                  <Card key={index} className="mb-2 shadow-sm">
                    <Card.Body className="py-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0 fs-6">{entry.spentOn} {entry.otherCategory && `(${entry.otherCategory})`}</h6>
                          <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                            <em>{new Date(entry.expenditureDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</em>
                          </small>
                        </div>
                        <div className="text-end">
                          <span className="badge bg-success rounded-pill">₹{entry.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Home;