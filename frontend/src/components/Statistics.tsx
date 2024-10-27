import { useState, useEffect, useRef } from 'react';
import { Card, Col, Container, Spinner, NavDropdown, Row, Stack, Button } from 'react-bootstrap';
import { getStatisticalData, getTimeDescription } from '../helper';
import { FaFilePdf } from 'react-icons/fa';
import { getStatistics, getTimeStatistics, getAmountStatistics, getSafeLimits, getChartData } from '../services/statisticService';
import { TIME_PERIODS, SAFE_SPENDING_CATEGORIES, PRODUCTIVE_TIME_CATEGORIES } from '../constants/constants';
import CurvedLineChart from './CurvedLineChart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Statistics = () => {

  const [timeStatistics, setTimeStatistics] = useState<any>(null);
  const [amountStatistics, setAmountStatistics] = useState<any>(null);
  const [timePeriod, setTimePeriod] = useState<any>(TIME_PERIODS[0]);
  const [amountPeriod, setAmountPeriod] = useState<any>(TIME_PERIODS[0]);
  const [chartTimePeriod, setChartTimePeriod] = useState<any>(TIME_PERIODS[0]);
  const [chartCategory, setChartCategory] = useState<string>('time');
  const [statisticalData, setStatisticalData] = useState<any>({});
  const [safeLimits, setSafeLimits] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>(null);

  const user = useSelector((state: any) => state.user);
  const fetchedRef = useRef(false);
  const navigate = useNavigate();

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

  const fetchChartData = async () => {
    const result: any = await getChartData();
    if(result.success){
      setChartData(result.chartData);
    } else {
      console.log(result.message);
    }
  }

  const fetchSafeLimits = () => {
    const result: any = getSafeLimits();
    setSafeLimits(result);
  }
  
  const getVariant = (value: number, category: string) => {
    value *= 100;
    if(SAFE_SPENDING_CATEGORIES.includes(category) || PRODUCTIVE_TIME_CATEGORIES.includes(category)){
      return value >= 100 ? 'success' : value > 90 ? 'warning' : 'danger';
    }
    return value >= 100 ? 'danger' : value > 90 ? 'warning' : 'success';
  };

  const fetchInitialData = async () => {
    setLoader(true);
    await fetchStatistics();
    await fetchTimeStatistics();
    await fetchAmountStatistics();
    await fetchChartData();
    fetchSafeLimits();
    setLoader(false);
  }

  useEffect(() => {
    if(user.isLoggedIn && !fetchedRef.current){
      fetchInitialData();
      fetchedRef.current = true;
    }
  }, [user.isLoggedIn]);

  return (
    !user.isLoggedIn ? 
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center p-5 bg-light rounded shadow">
        <h2 className="mb-4">Please log in to view your statistics</h2>
        <Button onClick={() => navigate('/login')} variant="primary" size="lg">
          Go to Login
        </Button>
      </div>
    </Container> :
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
                    <h4 className='mb-0 me-2 fw-bold'>₹{statisticalData.lastMonthAmount?.toFixed(2)}</h4>
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
                    <h4 className='mb-0 me-2 fw-bold'>₹{statisticalData.maxAvgAmount?.amount.toFixed(2)}<small className='fs-6 fw-normal'> / day</small></h4>
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
                  <h4 className='mb-0 me-2 fw-bold'>{getTimeDescription(statisticalData.productiveTime)}<small className='fs-6 fw-normal'> / day</small></h4>
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
                  <h4 className='mb-0 me-2 fw-bold'>{getTimeDescription(statisticalData.entertainmentTime)}<small className='fs-6 fw-normal'> / day</small></h4>
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
            <Card className='h-100 p-2'>
              <Card.Body>
                <Row className="align-items-center mb-4">
                  <Col xs={2}>
                    <NavDropdown title={chartCategory === 'time' ? 'Time Report' : 'Amount Report'}>
                      <NavDropdown.Item onClick={() => setChartCategory('time')}>Time Report</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => setChartCategory('amount')}>Amount Report</NavDropdown.Item>
                    </NavDropdown>
                  </Col>
                  <Col xs={8}>
                    <Card className="border-0">
                      <Card.Body className="p-0 d-flex justify-content-center">
                        <Stack direction="horizontal" gap={2} className='flex-wrap'>
                          {TIME_PERIODS.map((period) => (
                            <button key={period.id} className="btn btn-sm btn-outline-secondary" 
                              style={{ width: '90px', padding: '3px', backgroundColor: 'white', borderWidth: period.id === chartTimePeriod.id ? '1.5px' : '.2px', color: '#6c757d' }} 
                              onClick={() => setChartTimePeriod(period)}
                            >
                              {period.label}
                            </button>
                          ))}
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={2}>
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      style={{width: '120px', padding: '3px', backgroundColor: 'white', color: '#6c757d'}}>
                      <FaFilePdf className="me-2" />
                      Export PDF
                    </button>
                  </Col>
                </Row>
                <Row className="overflow-auto" style={{ height: '250px' }}>
                  <Col className='p-0'>
                    <CurvedLineChart chartData={chartData?.[chartCategory]?.[chartTimePeriod.id]} category={chartCategory} timePeriod={chartTimePeriod} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card className='p-2'>
              <Card.Body>
                <Row className='align-items-center justify-content-between mb-4 py-0'>
                  <Col xs={8} className='py-0'>
                    <Card.Title className='m-0'>Amount by category</Card.Title>
                  </Col>
                  <Col xs={4} className='d-flex justify-content-end'>
                    <NavDropdown title={amountPeriod.label}>
                      {TIME_PERIODS.map((period: any) => {
                        return <NavDropdown.Item onClick={() => setAmountPeriod(period)}>{period.label}</NavDropdown.Item>
                      })}
                    </NavDropdown>
                  </Col>
                </Row>
                <Row className="overflow-auto" style={{ height: '250px' }}>
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
            <Card className='h-100 p-1'>
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
            <Card className='p-2'>
              <Card.Body>
                <Row className='align-items-center justify-content-between mb-4'>
                  <Col xs={8} className='py-0'>
                    <Card.Title className='m-0'>Time by category</Card.Title>
                  </Col>
                  <Col xs={4} className='d-flex justify-content-end'>
                    <NavDropdown title={timePeriod.label}>
                      {TIME_PERIODS.map((period: any) => {
                        return <NavDropdown.Item onClick={() => setTimePeriod(period)}>{period.label}</NavDropdown.Item>
                      })}
                    </NavDropdown>
                  </Col>
                </Row>
                <Row className="overflow-auto" style={{ height: '250px' }}>
                  {timeStatistics?.[timePeriod.id]?.map((data: any, index: number) => (
                      <Col xs={12} key={index} className="mb-3">
                        <Card.Text className="mb-1 d-flex justify-content-between">
                          <span className="custom-progress-bar-label">{data.investedIn}</span>
                          <span className="custom-progress-bar-label">{getTimeDescription(Math.round(data.totalTime/Math.min(statisticalData.daysSinceAccountCreation, timePeriod.value)))} / day</span>
                        </Card.Text>
                        <div className="custom-progress-bar">
                          <div className={`custom-progress-bar-fill ${getVariant(data.totalTime / Math.min(safeLimits?.time?.[timePeriod.id]?.[data.investedIn], data.investedIn), statisticalData.daysSinceAccountCreation)}`}
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