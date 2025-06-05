import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Upload from './components/pages/Upload';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='sign-up' element={<SignUp />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;