import React, { useState } from 'react';
import { Button, Modal, Form, ListGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { FaPlus, FaDollarSign, FaList, FaChartBar } from 'react-icons/fa';
import { AMOUNT_CATEGORIES } from '../constants/constants';

interface AmountEntry {
  spentOn: string;
  amount: number;
}

const Amount: React.FC = () => {
  const [entries, setEntries] = useState<AmountEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddEntry = async () => {
    if (newCategory && newAmount > 0) {
      setEntries([...entries, { spentOn: newCategory, amount: newAmount }]);
      setNewCategory('');
      setNewAmount(0);
      handleClose();
      const resp = await fetch('http://localhost:3000/api/entries/amount',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({spentOn: newCategory, amount: newAmount})
      });
      const data = await resp.json();
      console.log('data: ',data);;
    }
  };

  const totalAmount: number = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const categories: string[] = Object.values(AMOUNT_CATEGORIES);

  return (
    <Container className="py-5">
      <h1 className="mb-5 text-center display-4 fw-bold text-success">Expense Tracker</h1>
      
      <Row className="mb-5 justify-content-center">
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow border-0 bg-light">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaDollarSign className="text-success mb-3" size={40} />
              <Card.Title className="fw-bold">Total Amount Spent</Card.Title>
              <Card.Text as="h3" className="mb-0 text-success">${totalAmount.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow border-0 bg-light">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaList className="text-success mb-3" size={40} />
              <Card.Title className="fw-bold">Number of Expenses</Card.Title>
              <Card.Text as="h3" className="mb-0 text-success">{entries.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow border-0 bg-light">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <FaChartBar className="text-success mb-3" size={40} />
              <Card.Title className="fw-bold">Average Expense</Card.Title>
              <Card.Text as="h3" className="mb-0 text-success">
                ${entries.length ? (totalAmount / entries.length).toFixed(2) : '0.00'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mb-5">
        <Button variant="success" onClick={handleShow} className="px-4 py-2 rounded-pill shadow-sm">
          <FaPlus className="me-2" /> Add New Expense
        </Button>
      </div>

      <ListGroup className="mx-auto" style={{ maxWidth: '800px' }}>
        {entries.map((item, index) => (
          <ListGroup.Item key={index} className="mb-3 border-0">
            <Card className="shadow-sm border-0 bg-light">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="fw-bold mb-1">{item.spentOn}</Card.Title>
                  <Card.Text className="text-muted">${item.amount.toFixed(2)}</Card.Text>
                </div>
                <FaDollarSign className="text-success" size={24} />
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {categories.map((category: string) => {
                  return <option key={category} value={category}>
                     {category}
                  </option>
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={newAmount}
                onChange={(e) => setNewAmount(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddEntry}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Amount;