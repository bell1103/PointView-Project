import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { supabase } from '../../supabaseClient';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/update-password',
    });

    if (error) {
      alert('Error sending reset email: ' + error.message);
    } else {
      alert('Check your email for a reset link.');
      navigate('/log-in');
    }
  };

  return (
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
        <button type="submit">Send Reset Email</button>
      </form>

      {message && <p>{message}</p>}

      <div className="go-to-login">
        <button onClick={() => navigate('/login')}>
            Go to Log In
        </button>
     </div>
    </div>
  );
};

export default ForgotPassword;
