import React, { useState, useEffect} from 'react';
import  { ACCESS_TOKEN } from '../constants/constants';
import { Col, Container, Row } from 'react-bootstrap';

const Statistics = () => {

  const [statistics, setStatistics] = useState<any>(null);
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');

  const getStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/statistics',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      console.log('result: ', result);
      if(result.success){
        setStatistics(result.statistics);
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStatistics();
  }, [])

  return (
    <Container>
      <Row>
        <Col style={{backgroundColor: 'yellow'}}>h1</Col>
        <Col style={{backgroundColor: 'lightblue'}}>h2</Col>
        <Col style={{backgroundColor: 'yellow'}}>h1</Col>
        <Col style={{backgroundColor: 'lightblue'}}>h2</Col>
      </Row>
      <Row>
        <Col sm={8} style={{backgroundColor: 'yellow'}}>h1</Col>
        <Col sm={4} style={{backgroundColor: 'lightblue'}}>h2</Col>
      </Row>
      <Row>
        <Col sm={8} style={{backgroundColor: 'yellow'}}>h1</Col>
        <Col sm={4} style={{backgroundColor: 'lightblue'}}>h2</Col>
      </Row>
    </Container>
  )
}

export default Statistics;