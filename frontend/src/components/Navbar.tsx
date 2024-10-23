import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IoPerson, IoLogIn, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';

const CustomNavbar = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({
      type: 'SET_USER',
      payload: {
        isLoggedIn: false,
        user: null
      }
    });
    localStorage.removeItem(ACCESS_TOKEN);
    navigate('/login');
  };

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
            {user.isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-2">
                  <IoPerson size={20} className="me-1" />
                  Profile
                </Nav.Link>
                <Button variant="primary" onClick={logoutHandler}>
                  <IoLogOut size={20} className="me-1" />
                  Logout
                </Button>
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
