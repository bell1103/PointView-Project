import React, { useState } from 'react';
import './SignUp.css'; // Create a separate CSS file for sign-up styles or reuse login styles
import { useNavigate } from 'react-router-dom'; 

export default function SignUp({ onLoginClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const navigate = useNavigate();
  const handleLogInClick = () => {
    navigate('/log-in');
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        // optionally redirect or login automatically
      } else {
        alert(data.message || 'Sign up failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-redirect">
          <p>Already have an account?</p>
          <button type="button" onClick={handleLogInClick}>Log In</button>
        </div>
      </div>
    </div>
  );
}
