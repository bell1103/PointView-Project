import React from 'react';
import './LogIn.css'; // assuming you save the above CSS in Login.css

export default function Login({ onSignUpClick }) {
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
          <button onClick={onSignUpClick}>Sign Up</button>
        </div>
      </div>
      </div>
  );
}
