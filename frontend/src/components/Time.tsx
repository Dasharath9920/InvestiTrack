import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, ListGroup, Card, Container, Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import { FaPlus, FaClock, FaEllipsisV, FaEdit, FaTrash, FaHourglassHalf, FaChartLine } from 'react-icons/fa';
import { TIME_CATEGORIES, ACCESS_TOKEN } from '../constants/constants';
import { formatTime } from '../helper';
import { TimeEntry } from '../constants/dataTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/time.css'
const initialEntry: TimeEntry = {
  investedIn: Object.values(TIME_CATEGORIES)[0],
  time: 0,
  activityDate: new Date().toISOString().split('T')[0]
}

const CustomToggle = React.forwardRef(({ children, onClick }: { children: React.ReactNode, onClick: (event: React.MouseEvent<HTMLDivElement>) => void }, ref: React.Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{cursor: 'pointer'}}
  >
    {children}
  </div>
));

const Time: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry>(initialEntry);
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: any) => state.user);

  const fetchedRef = useRef(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddEntry = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      setValidated(false);
      e.stopPropagation();
      return;
    }

    setValidated(true);
    if(currentEntry.investedIn && currentEntry.time > 0){
      const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const bodyData = editing ? {
        investedIn: currentEntry.investedIn,
        time: currentEntry.time,
        userId: currentEntry.userId,
        entryId: currentEntry._id,
        otherCategory: currentEntry.otherCategory,
        activityDate: currentEntry.activityDate
        } : {
        investedIn: currentEntry.investedIn,
        time: currentEntry.time,
        otherCategory: currentEntry.otherCategory,
        activityDate: currentEntry.activityDate
      }
      const resp = await fetch('/api/entries/time',{
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(bodyData)
      });
      const data = await resp.json();
      if(data.success){
        let currentEntries = entries.map((entry: any) => {
          if(entry.activityDate === data.updatedTimeData.activityDate.split('T')[0]){
            entry.data.map((_data: any) => _data._id === data.updatedTimeData._id ? data.updatedTimeData : _data);
          }
          return entry;
        });
        setEntries(currentEntries);
        setEditing(false);
        setCurrentEntry(initialEntry);
        handleClose();
        setValidated(true);
      }
      else{
        console.log('error: ',data);
      }
    }
  };

  const handleEdit = async (item: TimeEntry) => {
    setEditing(true);
    setCurrentEntry(item);
    handleShow();
  };

  const handleDelete = async (item: any) => {
    if(!item._id || !item.userId){
      console.log("Invalid item");
      return;
    }
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch('/api/entries/time', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({entryId: item._id, userId: item.userId})
    });
    const data = await resp.json();
    if(data.success){
      console.log('data: ',data);
      fetchTimeData(skip);
    } else{
      console.log('error: ',data);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setCurrentEntry({...currentEntry, time: value});
  };

  const fetchTimeData = async (skip: number) => {
    if(isLoading || !hasMore) return;

    setIsLoading(true);
    setSkip(skip);
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch(`/api/entries/time?skip=${skip}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    if(data.success){
      const newEntries = data.timeData.map((timeData: any) => ({ ...timeData, activityDate: timeData.activityDate.split('T')[0] }));
      console.log('entries: ', newEntries);
      setEntries(prevEntries => [...prevEntries, ...newEntries]);
      setHasMore(data.timeData.length === 10);
    }
    setIsLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if(scrollHeight - 100 <= scrollTop + clientHeight){
      fetchTimeData(skip+10);
    }
  }

  useEffect(() => {
    if(user.isLoggedIn && !fetchedRef.current){
      fetchTimeData(0);
      fetchedRef.current = true;
    }
  }, [user.isLoggedIn]);

  const categories: string[] = Object.values(TIME_CATEGORIES);
  

  return (
    !user.isLoggedIn ? 
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center p-5 bg-light rounded shadow">
        <h2 className="mb-4">Please log in to view your time investments</h2>
        <Button onClick={() => navigate('/login')} variant="primary" size="lg">
          Go to Login
        </Button>
      </div>
    </Container> :
   <Container className="py-3">
     <Card className="shadow-sm border-1 bg-gradient mb-4">
       <Card.Body className="py-3 px-5">
         <Row className="align-items-center">
           <Col xs={12} md={8} className="text-center text-md-start">
             <h1 className="display-6 fw-bold mb-3 text-primary align-items-center">
               <FaClock className="me-3" size={34}/>
                Time Tracker
             </h1>
             <p className="lead mb-0 text-muted">Efficiently manage and track your time investments</p>
           </Col>
           <Col xs={12} md={4} className="text-center mt-4 mt-md-0">
            <Button variant="primary" onClick={handleShow} className="px-4 py-2 rounded-pill shadow-sm">
              <FaPlus className="me-2" /> Add New Entry
            </Button>
           </Col>
         </Row>
       </Card.Body>
     </Card>

     <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <FaChartLine className="me-2" /> Recent Time Entries
        </Card.Header>
        <Card.Body>
          <ListGroup className="mx-auto" style={{ maxWidth: '100%', height: '450px', overflowY: 'auto' }} onScroll={handleScroll}>
              {
                entries.map((item: any, index: number) => {
                return (
                  <div className='time-block-heading' key={index}>
                    <h2>{item.activityDate}</h2>
                    <div className="row g-3">
                      {
                        item.data.map((item: any, index: number) => {
                          return (
                            <div className="col-md-6" key={item._id}>
                              <Card className="mb-2 shadow-sm">
                                <Card.Body className="py-1">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <h6 className="mb-0 fs-6">
                                        {item.investedIn} {item.otherCategory && `(${item.otherCategory})`}
                                      </h6>
                                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                        <em>{new Date(item.activityDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</em>
                                      </small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      {/* Badge with time */}
                                      <span className="badge bg-primary rounded-pill">{formatTime(item.time)}</span>
                                      {/* Dropdown button */}
                                      <Dropdown align="end" className="ms-2">
                                        <Dropdown.Toggle as={CustomToggle} id={`dropdown-${index}`}>
                                          <FaEllipsisV />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item onClick={() => handleEdit(item)}><FaEdit className="me-2" /> Edit</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleDelete(item)}><FaTrash className="me-2" /> Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                )
              })
            }


          {isLoading && <ListGroup.Item className="text-center mt-3">
              <Spinner animation="border" variant="primary" />
            </ListGroup.Item>}
          </ListGroup>
        </Card.Body>
      </Card>

     <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit Time Entry' : 'Add New Time Entry'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={(e) => handleAddEntry(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Activity</Form.Label>
              <Form.Select
                value={currentEntry.investedIn}
                onChange={(e) => setCurrentEntry({...currentEntry, investedIn: e.target.value})}
              >
                {categories.map((category: string) => {
                  return <option key={category} value={category}>
                     {category}
                  </option>
                })}
              </Form.Select>
            </Form.Group>
            {currentEntry.investedIn === TIME_CATEGORIES.OTHER && <Form.Group className="mb-3">
              <Form.Label>Custom activity</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter other activity'
                required
                value={currentEntry.otherCategory}
                onChange={(e) => setCurrentEntry({...currentEntry, otherCategory: e.target.value})}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid activity.
              </Form.Control.Feedback>
            </Form.Group>}
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                required
                min={1}
                value={currentEntry.time || ''}
                onChange={handleDurationChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid duration (minimum 1 minute).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activity date</Form.Label>
              <Form.Control
                type="date"
                value={currentEntry.activityDate}
                onChange={(e) => setCurrentEntry({...currentEntry, activityDate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={(e) => handleAddEntry(e)}>
            {editing ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
   </Container>
 );
};

export default Time;