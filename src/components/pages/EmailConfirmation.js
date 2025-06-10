import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; 

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('Confirming your email...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');

    if (!accessToken) {
      setError('Invalid or missing confirmation token.');
      setMessage(null);
      return;
    }

    // Supabase email confirmation flow
    async function confirmEmail() {
      const { error } = await supabase.auth.setSession({ access_token: accessToken });

      if (error) {
        setError(`Failed to confirm email: ${error.message}`);
        setMessage(null);
      } else {
        setMessage('Email confirmed successfully! Redirecting...');
        setTimeout(() => {
          navigate('/signup_success'); // Redirect after success
        }, 3000);
      }
    }

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, textAlign: 'center' }}>
      {message && <h2>{message}</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
