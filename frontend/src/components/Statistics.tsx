import React, { useState, useEffect} from 'react';
import  { ACCESS_TOKEN, AMOUNT_CATEGORIES, TIME_CATEGORIES } from '../constants/constants';
import { Card, Col, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, ProgressBar, Row, Stack } from 'react-bootstrap';
import { getStatisticalData, getTimeDescription } from '../helper';

import { useSelector } from 'react-redux';

const Statistics = () => {

  const [statistics, setStatistics] = useState<any>(null);
  const [statisticalData, setStatisticalData] = useState<any>({});
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
  const user = useSelector((state: any) => state.user);

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

      if(result.success){
        Object.values(AMOUNT_CATEGORIES).forEach((category) => {
          if(!result.statistics.lastMonthAmountData.find((amount: any) => amount.spentOn === category)){
            result.statistics.lastMonthAmountData.push({spentOn: category, totalAmount: 0});
          }
        });
        Object.values(TIME_CATEGORIES).forEach((category) => {
          if(!result.statistics.lastMonthTimeData.find((time: any) => time.spentOn === category)){
            result.statistics.lastMonthTimeData.push({spentOn: category, totalTime: 0});
          }
        });
        result.statistics.lastMonthAmountData = result.statistics.lastMonthAmountData.sort((a: any, b: any) => b.totalAmount - a.totalAmount);
        result.statistics.lastMonthTimeData = result.statistics.lastMonthTimeData.sort((a: any, b: any) => b.totalTime - a.totalTime);
        setStatistics(result.statistics);
        const statisticalData = getStatisticalData(result.statistics, user.accountCreatedOn);
        setStatisticalData(statisticalData);
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(user.isLoggedIn){
      getStatistics();
    }
  }, [user.isLoggedIn]);

  return (
    <Container>
      <Row className='mb-4'>
        <Col>
          <Card className='shadow-sm border-0 bg-gradient'>
            <Card.Body className='p-4'>
              <Card.Text className='text-muted mb-1'>Last Month Amount</Card.Text>
              <Stack direction='horizontal' className='align-items-baseline justify-content-between'>
                <h3 className='mb-0 me-2 fw-bold'>₹{statisticalData.lastMonthAmount?.toFixed(2)}</h3>
                <small className={`text-${statisticalData.lastMonthPercentage >= 0 ? 'success' : 'danger'}`}>
                  {statisticalData.lastMonthPercentage >= 0 ? '↑' : '↓'} {32.9}%
                </small>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='shadow-sm border-0 bg-gradient'>
            <Card.Body className='p-4'>
              <Card.Text className='text-muted mb-1'>Max Avg Amount ({statisticalData.maxAvgAmount?.spentOn})</Card.Text>
              <Stack direction='horizontal' className='align-items-baseline justify-content-between'>
                <h3 className='mb-0 me-2 fw-bold'>₹{statisticalData.maxAvgAmount?.amount.toFixed(2)}<small className='fs-6 fw-normal'> / day</small></h3>
                <small className={`text-${statisticalData.lastMonthPercentage >= 0 ? 'success' : 'danger'}`}>
                  {statisticalData.lastMonthPercentage >= 0 ? '↑' : '↓'} {32.9}%
                </small>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='shadow-sm border-0 bg-gradient'>
            <Card.Body className='p-4'>
              <Card.Text className='text-muted mb-1'>Productive Time</Card.Text>
              <Stack direction='horizontal' className='align-items-baseline justify-content-between'>
                <h3 className='mb-0 me-2 fw-bold'>{getTimeDescription(statisticalData.productiveTime)}<small className='fs-6 fw-normal'> / day</small></h3>
                <small className={`text-${statisticalData.lastMonthPercentage >= 0 ? 'success' : 'danger'}`}>
                  {statisticalData.lastMonthPercentage >= 0 ? '↑' : '↓'} {32.9}%
                </small>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='shadow-sm border-0 bg-gradient'>
            <Card.Body className='p-4'>
              <Card.Text className='text-muted mb-1'>Entertainment Time</Card.Text>
              <Stack direction='horizontal' className='align-items-baseline justify-content-between'>
                <h3 className='mb-0 me-2 fw-bold'>{getTimeDescription(statisticalData.entertainmentTime)}<small className='fs-6 fw-normal'> / day</small></h3>
                <small className={`text-${statisticalData.lastMonthPercentage >= 0 ? 'success' : 'danger'}`}>
                  {statisticalData.lastMonthPercentage >= 0 ? '↑' : '↓'} {32.9}%
                </small>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mb-4' style={{minHeight: '300px'}}>
        <Col sm={8}>
          <Card className='h-100'>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={3}>Amount Spent</Col>
                <Col xs={7}>
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <Stack direction="horizontal" gap={2}>
                        {['5 years', '12 months', '6 months', '30 days', '10 days'].map((period) => (
                          <button key={period} className="btn btn-sm btn-outline-secondary">
                            {period}
                          </button>
                        ))}
                      </Stack>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={2}>export to pdf</Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Row className='align-items-center justify-content-between mb-3'>
                <Col xs={8}>
                  <Card.Title>Amount by category</Card.Title>
                </Col>
                <Col xs={4}>
                  <DropdownButton
                    variant="outline-secondary"
                    title="Select Period"
                    size="sm"
                    className="p-0"
                  >
                    <Dropdown.Item>5 years</Dropdown.Item>
                    <Dropdown.Item>12 months</Dropdown.Item>
                    <Dropdown.Item>6 months</Dropdown.Item>
                    <Dropdown.Item>30 days</Dropdown.Item>
                    <Dropdown.Item>7 days</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row className="overflow-auto" style={{ height: '300px' }}>
                {statistics?.lastMonthAmountData?.map((data: any, index: number) => (
                    <Col xs={12} key={index} className="mb-3">
                      <Card.Text className="mb-1">{data.spentOn}</Card.Text>
                      <ProgressBar 
                        now={70} 
                        label={`₹${data.totalAmount?.toFixed(2) || 0}`} 
                        variant={'success'}
                      />
                    </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{minHeight: '300px'}}>
      <Col sm={8}>
          <Card className='h-100'>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={3}>Time Spent</Col>
                <Col xs={7}>
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <Stack direction="horizontal" gap={2}>
                        {['5 years', '12 months', '6 months', '30 days', '10 days'].map((period) => (
                          <button key={period} className="btn btn-sm btn-outline-secondary">
                            {period}
                          </button>
                        ))}
                      </Stack>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={2}>export to pdf</Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Row className='align-items-center justify-content-between mb-3'>
                <Col xs={8}>
                  <Card.Title>Time by category</Card.Title>
                </Col>
                <Col xs={4}>
                  <DropdownButton
                    variant="outline-secondary"
                    title="Select Period"
                    size="sm"
                    className="p-0"
                  >
                    <Dropdown.Item>5 years</Dropdown.Item>
                    <Dropdown.Item>12 months</Dropdown.Item>
                    <Dropdown.Item>6 months</Dropdown.Item>
                    <Dropdown.Item>30 days</Dropdown.Item>
                    <Dropdown.Item>7 days</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row className="overflow-auto" style={{ height: '300px' }}>
                {statistics?.lastMonthTimeData?.map((data: any, index: number) => (
                    <Col xs={12} key={index} className="mb-3">
                      <Card.Text className="mb-1">{data.investedIn}</Card.Text>
                      <ProgressBar 
                        now={70} 
                        label={getTimeDescription(data.totalTime)} 
                        variant={'success'}
                      />
                    </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Statistics;