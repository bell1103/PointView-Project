import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        <a href="#" className="forgot-password">Forgot Password?</a>
        <div className="signup-redirect">
          <p>Don't have an account?</p>
          <button className="sign-up-btn" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
