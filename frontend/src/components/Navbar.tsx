import { Navbar, Nav, Container, Image, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants/constants';
import actionTypes from '../constants/actionTypes';

const CustomNavbar = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        isLoggedIn: false,
        username: '',
        email: ''
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
            <NavLink to="/" className={({ isActive }) => `nav-link me-3 ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
            <NavLink to="/time" className={({ isActive }) => `nav-link me-3 ${isActive ? 'active' : ''}`}>Time</NavLink>
            <NavLink to="/amount" className={({ isActive }) => `nav-link me-3 ${isActive ? 'active' : ''}`}>Amount</NavLink>
            <NavLink to="/statistics" className={({ isActive }) => `nav-link me-3 ${isActive ? 'active' : ''}`}>Statistics</NavLink>
            <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Settings</NavLink>
          </Nav>
          <Nav>
            {user.isLoggedIn ? (
              <>
              <NavDropdown
              title={
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center bg-light rounded-circle p-2 me-2">
                    <IoPerson size={20} className="text-primary" />
                  </div>
                  <span className="text-dark">{user.username}</span>
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
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
