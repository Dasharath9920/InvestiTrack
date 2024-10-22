import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, ListGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { FaPlus, FaClock, FaList, FaChartBar } from 'react-icons/fa';
import { TIME_CATEGORIES, ACCESS_TOKEN } from '../constants/constants';

interface TimeEntry {
  investedIn: string;
  time: number;
}

const Time: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState(Object.values(TIME_CATEGORIES)[0]);
  const [newDuration, setNewDuration] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddEntry = async () => {
    if (newActivity && newDuration > 0) {
      setEntries([...entries, { investedIn: newActivity, time: newDuration }]);
      setNewActivity('');
      setNewDuration(0);
      const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const resp = await fetch('http://localhost:3000/api/entries/time',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({investedIn: newActivity, time: newDuration})
      });
      const data = await resp.json();
      if(data.success){
        console.log('data: ',data);
        handleClose();
      }
      else{
        console.log('error: ',data);
      }
    }
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
      setEntries(data.timeData);
    }
  };

  useEffect(() => {
    fetchTimeData();
  }, []);

  const categories: string[] = Object.values(TIME_CATEGORIES);
  const totalTime = entries.reduce((sum, entry) => sum + entry.time, 0);

  return (
   <Container className="py-5">
     <h1 className="mb-5 text-center display-4 fw-bold text-primary">Time Tracker</h1>
     
     <Row className="mb-5 justify-content-center">
       <Col md={4} className="mb-4 mb-md-0">
         <Card className="h-100 shadow border-0 bg-light">
           <Card.Body className="d-flex flex-column justify-content-center align-items-center">
             <FaClock className="text-primary mb-3" size={40} />
             <Card.Title className="fw-bold">Total Time Spent</Card.Title>
             <Card.Text as="h3" className="mb-0 text-primary">{totalTime} minutes</Card.Text>
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
               {entries.length ? (totalTime / entries.length).toFixed(2) : 0} minutes
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

     <ListGroup className="mx-auto" style={{ maxWidth: '800px' }}>
       {entries.map((item, index) => (
         <ListGroup.Item key={index} className="mb-3 border-0">
           <Card className="shadow-sm border-0 bg-light">
             <Card.Body className="d-flex justify-content-between align-items-center">
               <div>
                 <Card.Title className="fw-bold mb-1">{item.investedIn}</Card.Title>
                 <Card.Text className="text-muted">{item.time} minutes</Card.Text>
               </div>
               <FaClock className="text-primary" size={24} />
             </Card.Body>
           </Card>
         </ListGroup.Item>
       ))}
     </ListGroup>

     <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Time Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Activity</Form.Label>
              <Form.Select
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              >
                {categories.map((category: string) => {
                  return <option key={category} value={category}>
                     {category}
                  </option>
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Add Entry
          </Button>
        </Modal.Footer>
      </Modal>
   </Container>
 );
};

export default Time;