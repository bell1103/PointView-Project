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
import ForgotPassword from './components/pages/ForgotPassword';
import UpdatePassword from './components/pages/UpdatePassword';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import MyHome from './components/pages/MyHome';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyMatches from './components/pages/MyMatches';
import PlayMatch from './components/pages/PlayMatch';



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
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-home" element={<MyHome />} />
          <Route path="/my-matches" element={<MyMatches />} />
          <Route path="/play/:matchId" element={<PlayMatch />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;