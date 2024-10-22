import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaDollarSign, FaClock, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';

const Home = () => {
  const user = useSelector((state: any) => state.user);

  const fetchData = async () => {
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch('http://localhost:3000/api/entries/dashboard',{
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    console.log('data: ',data);
    if(data.success){
    }
  }

  useEffect(() => {
    if(user.isLoggedIn){
      fetchData();
    }
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Dashboard</h1>
      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <FaDollarSign size={48} className="text-primary mb-3" />
              <Card.Title>Total Spent</Card.Title>
              <Card.Text className="h2">$1,234.56</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <FaClock size={48} className="text-success mb-3" />
              <Card.Title>Total Time</Card.Title>
              <Card.Text className="h2">42h 30m</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mx-auto">
            <Card.Body>
              <Card.Title>Recent Entries</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">Groceries - $85.20 (1h 15m)</li>
                <li className="mb-2">Gas - $45.00 (15m)</li>
                <li className="mb-2">Movie Night - $30.50 (2h 30m)</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center">
        <Button variant="primary" size="lg">
          <FaPlus className="me-2" /> Add New Entry
        </Button>
      </div>
    </Container>
  );
};

export default Home;