import React, { useState, useEffect} from 'react';
import { Card, Col, Container, Dropdown, DropdownButton, Spinner, Navbar, NavDropdown, ProgressBar, Row, Stack } from 'react-bootstrap';
import { getStatisticalData, getTimeDescription } from '../helper';
import { getStatistics, getTimeStatistics, getAmountStatistics, getSafeLimits } from '../services/statisticService';
import { TIME_PERIODS, SAFE_SPENDING_CATEGORIES, PRODUCTIVE_TIME_CATEGORIES } from '../constants/constants';

import { useSelector } from 'react-redux';

const Statistics = () => {

  const [timeStatistics, setTimeStatistics] = useState<any>(null);
  const [amountStatistics, setAmountStatistics] = useState<any>(null);
  const [timePeriod, setTimePeriod] = useState<any>(TIME_PERIODS[0]);
  const [amountPeriod, setAmountPeriod] = useState<any>(TIME_PERIODS[0]);
  const [statisticalData, setStatisticalData] = useState<any>({});
  const [safeLimits, setSafeLimits] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const fetchStatistics = async () => {
    try {
      const result: any = await getStatistics();
      if(result.success){
        const statisticalData = getStatisticalData(result.statistics, user.accountCreatedOn);
        setStatisticalData(statisticalData);
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTimeStatistics = async () => {
    const result: any = await getTimeStatistics();
    setTimeStatistics(result.data);
  }

  const fetchAmountStatistics = async () => {
    const result: any = await getAmountStatistics();
    setAmountStatistics(result.data);
  }

  const fetchSafeLimits = async () => {
    const result: any = await getSafeLimits();
    setSafeLimits(result);
  }
  
  const getVariant = (value: number, category: string) => {
    value *= 100;
    if(SAFE_SPENDING_CATEGORIES.includes(category) || PRODUCTIVE_TIME_CATEGORIES.includes(category)){
      return value > 90 ? 'success' : value > 75 ? 'warning' : 'danger';
    }
    return value > 90 ? 'danger' : value > 75 ? 'warning' : 'success';
  };

  const fetchInitialData = async () => {
    setLoader(true);
    await fetchStatistics();
    await fetchTimeStatistics();
    await fetchAmountStatistics();
    await fetchSafeLimits();
    setLoader(false);
  }

  useEffect(() => {
    if(user.isLoggedIn){
      fetchInitialData();
    }
  }, [user.isLoggedIn]);

  return (
    <Container>
      {loader ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row className='mb-4'>
            <Col>
              <Card className='shadow-sm border-0 bg-gradient'>
                <Card.Body className='p-4'>
                  <Card.Text className='text-muted mb-1'>Last Month Amount</Card.Text>
                  <Stack direction='horizontal' className='align-items-baseline justify-content-between'>
                    <h3 className='mb-0 me-2 fw-bold'>₹{statisticalData.lastMonthAmount?.toFixed(2)}</h3>
                    <small className={`text-${statisticalData.amountDifferencePercentage <= 0 ? 'success' : 'danger'}`}>
                      {statisticalData.amountDifferencePercentage >= 0 ? '↑' : '↓'} {statisticalData.amountDifferencePercentage?.toFixed(2)}%
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
                    <small className={`text-${statisticalData.averageAmountDifferencePercentage <= 0 ? 'success' : 'danger'}`}>
                      {statisticalData.averageAmountDifferencePercentage >= 0 ? '↑' : '↓'} {statisticalData.averageAmountDifferencePercentage?.toFixed(2)}%
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
                  <small className={`text-${statisticalData.productiveTimeDifferencePercentage >= 0 ? 'success' : 'danger'}`}>
                    {statisticalData.productiveTimeDifferencePercentage >= 0 ? '↑' : '↓'} {statisticalData.productiveTimeDifferencePercentage?.toFixed(2)}%
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
                  <small className={`text-${statisticalData.entertainmentTimeDifferencePercentage <= 0 ? 'success' : 'danger'}`}>
                    {statisticalData.entertainmentTimeDifferencePercentage >= 0 ? '↑' : '↓'} {statisticalData.entertainmentTimeDifferencePercentage?.toFixed(2)}%
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
                          {TIME_PERIODS.map((period) => (
                            <button key={period.id} className="btn btn-sm btn-outline-secondary">
                              {period.label}
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
                      title={amountPeriod.label}
                      size="sm"
                      className="p-0"
                    >
                      {TIME_PERIODS.map((period: any) => {
                        return <Dropdown.Item onClick={() => setAmountPeriod(period)}>{period.label}</Dropdown.Item>
                      })}
                    </DropdownButton>
                  </Col>
                </Row>
                <Row className="overflow-auto" style={{ height: '300px' }}>
                  {amountStatistics?.[amountPeriod.id]?.map((data: any, index: number) => (
                      <Col xs={12} key={index} className="mb-3">
                        <Card.Text className="mb-1 d-flex justify-content-between">
                          <span className="custom-progress-bar-label">{data.spentOn}</span>
                          <span className="custom-progress-bar-label">₹{data.totalAmount?.toFixed(2) || 0}</span>
                        </Card.Text>
                        <div className="custom-progress-bar">
                          <div 
                            className={`custom-progress-bar-fill ${getVariant(data.totalAmount / safeLimits?.amount?.[amountPeriod.id]?.[data.spentOn], data.spentOn)}`}
                            style={{
                              width: `${safeLimits?.amount?.[amountPeriod.id]?.[data.spentOn] ? (Math.min(100,data.totalAmount / safeLimits?.amount?.[amountPeriod.id]?.[data.spentOn] * 100)) : 0}%`
                            }}
                          >
                          </div>
                        </div>
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
                          {TIME_PERIODS.map((period) => (
                            <button key={period.id} className="btn btn-sm btn-outline-secondary">
                              {period.label}
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
                      title={timePeriod.label}
                      size="sm"
                      className="p-0"
                    >
                      {TIME_PERIODS.map((period: any) => {
                        return <Dropdown.Item onClick={() => setTimePeriod(period)}>{period.label}</Dropdown.Item>
                      })}
                    </DropdownButton>
                  </Col>
                </Row>
                <Row className="overflow-auto" style={{ height: '300px' }}>
                  {timeStatistics?.[timePeriod.id]?.map((data: any, index: number) => (
                      <Col xs={12} key={index} className="mb-3">
                        <Card.Text className="mb-1 d-flex justify-content-between">
                          <span className="custom-progress-bar-label">{data.investedIn}</span>
                          <span className="custom-progress-bar-label">{getTimeDescription(Math.round(data.totalTime/timePeriod.value))}</span>
                        </Card.Text>
                        <div className="custom-progress-bar">
                          <div className={`custom-progress-bar-fill ${getVariant(data.totalTime / safeLimits?.time?.[timePeriod.id]?.[data.investedIn], data.investedIn)}`}
                            style={{
                              width: `${safeLimits?.time?.[timePeriod.id]?.[data.investedIn] ? Math.min(100, data.totalTime / safeLimits?.time?.[timePeriod.id]?.[data.investedIn] * 100) : 0}%`
                            }}
                          >
                          </div>
                        </div>
                      </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default Statistics;