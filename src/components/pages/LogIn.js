import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'; 
import './LogSignIn.css';
import Footer from '../Footer';

export default function Login() {
  //scroll to top when the component mounts
      useEffect(() => {
          window.scrollTo(0, 0);
      }, [/log-in/]); // Trigger the effect when the pathname changes

  const navigate = useNavigate();
  const { signInUser, loading } = UserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (loading) return <p>Loading...</p>;


  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6 ) {
      setErrorMsg('Password must be at least 6 charaters.');
      return;
    }

    const { success, error } = await signInUser(email, password);
    
    if (success) {
      navigate('/dashboard'); // redirect to Dashboard page
    } else {
      if (
        error.toLowerCase().includes('invalid login credentials') ||
        error.toLowerCase().includes('invalid email or password')
      ) {
        setErrorMsg('Incorrect email or password.');
      } else if (error.toLowerCase().includes('user not found')) {
        setErrorMsg('No account found with that email.');
      } else if (error.toLowerCase().includes('email not confirmed')) {
        setErrorMsg('Please confirm your email before logging in.');
      } else {
        setErrorMsg(error);
      }
    }
  };

  return (
    <div className='login-greatest'>
      <div className='login-wrapper'>
        <video
        className="background-video"
        src="/videos/stanford-men-footage.mp4"
        autoPlay
        loop
        muted
        />
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>

          <a
            href="/forgot-password"
            className="forgot-password"
            onClick={(e) => {
            e.preventDefault();
            navigate('/forgot-password');
          }}
          >
            Forgot Password?
          </a>

          <div className="signup-redirect">
            <p>Don't have an account?</p>
            <button className="sign-up-btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <><Footer /></>
    </div>  
  );
}
