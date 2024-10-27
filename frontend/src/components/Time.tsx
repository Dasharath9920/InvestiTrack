import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, ListGroup, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaPlus, FaClock, FaList, FaChartBar, FaEllipsisV, FaEdit, FaTrash, FaHourglassHalf, FaChartLine } from 'react-icons/fa';
import { TIME_CATEGORIES, ACCESS_TOKEN } from '../constants/constants';
import { formatTime, getTimeDescription } from '../helper';
import { TimeEntry } from '../constants/dataTypes';
import { useSelector } from 'react-redux';

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
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry>(initialEntry);
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const user = useSelector((state: any) => state.user);

  const fetchedRef = useRef(false);

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
      const resp = await fetch('http://localhost:3000/api/entries/time',{
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(bodyData)
      });
      const data = await resp.json();
      if(data.success){
        fetchTimeData();
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
    const resp = await fetch('http://localhost:3000/api/entries/time', {
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
      fetchTimeData();
    } else{
      console.log('error: ',data);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setCurrentEntry({...currentEntry, time: value});
  };

  const fetchTimeData = async () => {
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch('http://localhost:3000/api/entries/time',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    if(data.success){
      setEntries(data.timeData.map((timeData: any) => ({...timeData, activityDate: timeData.activityDate.split('T')[0]})));
    }
  };

  useEffect(() => {
    if(user.isLoggedIn && !fetchedRef.current){
      fetchTimeData();
      fetchedRef.current = true;
    }
  }, [user.isLoggedIn]);

  const categories: string[] = Object.values(TIME_CATEGORIES);
  const totalTime = entries.reduce((sum: number, entry: TimeEntry) => sum + Number(entry.time), 0);

  return (
   <Container className="py-3">
     <h1 className="mb-5 text-center display-6 fw-bold text-primary">Time Tracker</h1>
     
     <Row className="mb-5 justify-content-center">
       <Col md={4} className="mb-4 mb-md-0">
         <Card className="h-100 shadow border-0 bg-light">
           <Card.Body className="d-flex flex-column justify-content-center align-items-center">
             <FaClock className="text-primary mb-3" size={40} />
             <Card.Title className="fw-bold">Total Time Spent</Card.Title>
             <Card.Text as="h3" className="mb-0 text-primary">{formatTime(totalTime)}</Card.Text>
           </Card.Body>
         </Card>
       </Col>
       <Col md={4} className="mb-4 mb-md-0">
         <Card className="h-100 shadow border-0 bg-light">
           <Card.Body className="d-flex flex-column justify-content-center align-items-center">
             <FaList className="text-primary mb-3" size={40} />
             <Card.Title className="fw-bold">Number of Activities</Card.Title>
             <Card.Text as="h3" className="mb-0 text-primary">{entries.length}</Card.Text>
           </Card.Body>
         </Card>
       </Col>
       <Col md={4}>
         <Card className="h-100 shadow border-0 bg-light">
           <Card.Body className="d-flex flex-column justify-content-center align-items-center">
             <FaChartBar className="text-primary mb-3" size={40} />
             <Card.Title className="fw-bold">Average Time per Activity</Card.Title>
             <Card.Text as="h3" className="mb-0 text-primary">
               {entries.length ? formatTime(totalTime / entries.length) : 0}
             </Card.Text>
           </Card.Body>
         </Card>
       </Col>
     </Row>

     <div className="text-center mb-5">
       <Button variant="primary" onClick={handleShow} className="px-4 py-2 rounded-pill shadow-sm">
         <FaPlus className="me-2" /> Add New Entry
       </Button>
     </div> 

     <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          <FaChartLine className="me-2" /> Recent Amount Entries
        </Card.Header>
        <Card.Body>
          <ListGroup className="mx-auto" style={{ maxWidth: '100%', height: '400px', overflowY: 'auto' }}>
            {entries.map((item, index) => (
              <ListGroup.Item key={index} className="mb-2 border-0">
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="fw-bold mb-1">{item.investedIn} {item.otherCategory && `(${item.otherCategory})`}</Card.Title>
                      <Dropdown align="end">
                        <Dropdown.Toggle as={CustomToggle} id={`dropdown-${index}`}>
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(item)}><FaEdit className="me-2" /> Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(item)}><FaTrash className="me-2" /> Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="d-flex align-items-end justify-content-between text-muted small">
                      <div className="d-flex align-items-center mb-0">
                        <FaHourglassHalf className="text-primary me-2" size={18} />
                        <Card.Text className="text-primary fw-bold mb-0 fs-5">
                          {formatTime(item.time)}
                        </Card.Text>
                      </div>
                      <span>
                        <strong>Spent on:</strong> {new Date(item.activityDate).toLocaleDateString()}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
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