import React from 'react';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Upload from './components/pages/Upload';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import EmailConfirmation from './components/pages/EmailConfirmation';
import SignupSuccess from './components/pages/SignupSuccess';
import Profile from './components/pages/Profile';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/log-in' element={<LogIn />} />
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/email-confirmation' element={<EmailConfirmation/>} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route path='/profile' element={<Profile />}/>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;