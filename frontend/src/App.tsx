import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Time from './components/Time';
import Amount from './components/Amount';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Login from './components/Login';

function App() {

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
