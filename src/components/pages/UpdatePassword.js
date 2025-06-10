import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');         
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    
    alert('Password reset successfully!');

    //navigate to login page after reset
    navigate('/log-in');
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>

        {message && <p>{message}</p>}

        <div className="go-to-login">
          <button onClick={() => navigate('/login')}>Go to Log In</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
