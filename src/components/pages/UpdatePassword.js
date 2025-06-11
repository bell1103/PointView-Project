import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './ForgotPassword.css';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');         
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        alert('No active session found.');
        navigate('/login');
      }
    });
  }, [navigate]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      alert('Error updating password: ' + error.message);
    } else {
      alert('Password updated successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleUpdate}>
    
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

export default UpdatePassword;
