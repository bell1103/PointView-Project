import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'; 
import './LogIn.css';

export default function Login() {
  const navigate = useNavigate();
  const { signInUser } = UserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, error } = await signInUser(email, password);

    if (success) {
      navigate('/dashboard'); // 🔁 redirect to your Dashboard page
    } else {
      setErrorMsg(error);
    }
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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

        {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

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
