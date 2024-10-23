import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Time from './components/Time';
import Amount from './components/Amount';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ACCESS_TOKEN } from './constants/constants';
import actionTypes from './constants/actionTypes';

function App() {

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initializeUser = async () => {
    const authToken = localStorage.getItem(ACCESS_TOKEN)? JSON.parse(localStorage.getItem(ACCESS_TOKEN)!): '';
    console.log('here: ',user, authToken);
    if(!authToken){
      localStorage.removeItem(ACCESS_TOKEN);
      navigate('/login');
    }
    if(!user.isLoggedIn && authToken){
      const userDetails = await fetch(`http://localhost:3000/api/users/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await userDetails.json();
      dispatch({
        type: actionTypes.SET_USER,
        payload: {
          isLoggedIn: true,
          username: data.userName,
          email: data.email
        }
      });
    }
  }

  useEffect(() => {
    if(!user.isLoggedIn){
      initializeUser();
    }
  },[]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/time' element={<Time />} />
        <Route path='/amount' element={<Amount />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
