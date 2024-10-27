import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, ListGroup, Card, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaPlus, FaRupeeSign, FaEdit, FaTrash, FaEllipsisV, FaChartLine } from 'react-icons/fa';
import { AMOUNT_CATEGORIES, ACCESS_TOKEN } from '../constants/constants';
import { AmountEntry } from '../constants/dataTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialEntry: AmountEntry = {
  spentOn: Object.values(AMOUNT_CATEGORIES)[0],
  amount: 0,
  expenditureDate: new Date().toISOString().split('T')[0]
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

const Amount: React.FC = () => {
  const [entries, setEntries] = useState<AmountEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<AmountEntry>(initialEntry);
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);

  const fetchedRef = useRef(false);
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddEntry = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      e.stopPropagation();
      return;
    }
    setValidated(true);

    if (currentEntry?.spentOn && currentEntry.amount > 0) {
      const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const bodyData = editing? {
        spentOn: currentEntry.spentOn,
        amount: currentEntry.amount,
        userId: currentEntry.userId,
        entryId: currentEntry._id,
        otherCategory: currentEntry.otherCategory,
        expenditureDate: currentEntry.expenditureDate
      } : {
        spentOn: currentEntry.spentOn,
        amount: currentEntry.amount,
        otherCategory: currentEntry.otherCategory,
        expenditureDate: currentEntry.expenditureDate
      }
      const resp = await fetch('/api/entries/amount',{
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(bodyData)
      });
      const data = await resp.json();

      if(data.success){
        fetchAmountData();
        setEditing(false);
        setCurrentEntry(initialEntry);
        handleClose();
      }
      else{
        console.log('error: ',data);
      }
    }
  };

  const handleEdit = async (item: AmountEntry) => {
    handleShow();
    setCurrentEntry(item);
    setEditing(true);
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setCurrentEntry({...currentEntry, amount: value});
  }

  const handleDelete = async (item: any) => {
    if(!item._id || !item.userId){
      console.log("Invalid item");
      return;
    }

    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch('/api/entries/amount',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({entryId: item._id, userId: item.userId})
    });
    const data = await resp.json();
    if(data.success){
      console.log('data: ',data);
      fetchAmountData();
    }
    else{
      console.log('error: ',data);
    }
  }

  const fetchAmountData = async () => {
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
    const resp = await fetch('/api/entries/amount',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await resp.json();
    if(data.success){
      setEntries(data.amountData.map((amountData: any) => ({...amountData, expenditureDate: amountData.expenditureDate.split('T')[0]})));
    }
  };

  useEffect(() => {
    if(user.isLoggedIn && !fetchedRef.current){
      fetchAmountData();
      fetchedRef.current = true;
    }
  }, [user.isLoggedIn]);

  const categories: string[] = Object.values(AMOUNT_CATEGORIES);

  return (
    !user.isLoggedIn ? 
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center p-5 bg-light rounded shadow">
        <h2 className="mb-4">Please log in to view your expenses</h2>
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
             <h1 className="display-6 fw-bold mb-3 text-success align-items-center">
               <FaRupeeSign className="me-3" size={34}/>
                Expense Tracker
             </h1>
             <p className="lead mb-0 text-muted">Efficiently manage and track your financial expenses</p>
           </Col>
           <Col xs={12} md={4} className="text-center mt-4 mt-md-0">
            <Button variant="success" onClick={handleShow} className="px-4 py-2 rounded-pill shadow-sm">
              <FaPlus className="me-2" /> Add New Expense
            </Button>
           </Col>
         </Row>
       </Card.Body>
     </Card>

      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          <FaChartLine className="me-2" /> Recent Amount Entries
        </Card.Header>
        <Card.Body>
          <ListGroup className="mx-auto" style={{ maxWidth: '100%', height: '450px', overflowY: 'auto' }}>
            {entries.map((item, index) => (
              <ListGroup.Item key={index} className="mb-2 border-0">
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="fw-bold mb-0">{item.spentOn} {item.otherCategory && `(${item.otherCategory})`}</Card.Title>
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
                      <Card.Text className="text-success fs-4 mb-0">₹{item.amount.toFixed(2)}</Card.Text>
                      <span>
                        <strong>Spent on:</strong> {new Date(item.expenditureDate || '').toLocaleDateString()}
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
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={(e) => handleAddEntry(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={currentEntry.spentOn}
                onChange={(e) => setCurrentEntry({...currentEntry, spentOn: e.target.value})}
              >
                {categories.map((category: string) => {
                  return <option key={category} value={category}>
                     {category}
                  </option>
                })}
              </Form.Select>
            </Form.Group>
            {currentEntry.spentOn === AMOUNT_CATEGORIES.OTHER && <Form.Group className="mb-3">
              <Form.Label>Custom category</Form.Label>
              <Form.Control
                type="text"
                placeholder='Enter how did you spend the amount'
                required
                value={currentEntry.otherCategory}
                onChange={(e) => setCurrentEntry({...currentEntry, otherCategory: e.target.value})}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid category.
              </Form.Control.Feedback>
            </Form.Group>}
            <Form.Group className="mb-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                required
                min={1}
                value={currentEntry.amount || ''}
                onChange={handleAmountChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid amount (minimum 1).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expenditure date</Form.Label>
              <Form.Control
                type="date"
                value={currentEntry.expenditureDate}
                onChange={(e) => setCurrentEntry({...currentEntry, expenditureDate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="success" onClick={(e) => handleAddEntry(e)}>
            {editing ? 'Update Expense' : 'Add Expense'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Amount;