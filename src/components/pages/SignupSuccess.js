import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2>Sign Up Successful!</h2>
      <p>Your email has been confirmed. You can now log in and start using the app.</p>
      <button onClick={() => navigate('/login')} style={{ marginTop: 20 }}>
        Go to Login
      </button>
    </div>
  );
}
