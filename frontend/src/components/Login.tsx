import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [tab, setTab] = useState<string>('login');

  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  }

  const registerUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
  }

  return (
    <Container className="d-flex align-items-start justify-content-center pt-5" style={{minHeight: '80vh'}}>
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">{tab === 'login' ? 'Login' : 'Register'}</h2>
          <Tabs activeKey={tab} onSelect={(k) => setTab(k as string)} className="mb-3" fill>
            <Tab eventKey="login" title="Login" className='pt-2'>
              <Form onSubmit={loginUser}>
                <Form.Group className="mb-4" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-2">
                  Login
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register" className='pt-2'>
              <Form onSubmit={registerUser}>
                <Form.Group className="mb-4" controlId="registerUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="registerEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-4" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <p className='text-center mt-3 small'>Already registerd? <a href="#" onClick={(e) => {e.preventDefault(); setTab('login')}}>Login here</a></p>
                <Button variant="primary" type="submit" className="w-100 mt-2">
                  Register
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;