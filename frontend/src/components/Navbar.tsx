import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoPerson, IoLogIn, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const CustomNavbar = () => {
  const state = useSelector((state: any) => state);
  console.log("state: ",state);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="/images/logo.png" alt="logo" width="140" height="auto" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='justify-content-end flex-grow-1 pe-3 me-5'>
            <Nav.Link as={Link} to="/time" className="me-3">Time</Nav.Link>
            <Nav.Link as={Link} to="/amount" className="me-3">Amount</Nav.Link>
            <Nav.Link as={Link} to="/statistics" className="me-3">Statistics</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
          <Nav>
            {state.user.isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-2">
                  <IoPerson size={20} className="me-1" />
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="me-2">
                  <Button variant="primary">
                    <IoLogOut size={20} className="me-1" />
                    Logout
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="me-2">
                <Button variant="primary">
                  <IoLogIn size={20} className="me-1" />
                  Login
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
