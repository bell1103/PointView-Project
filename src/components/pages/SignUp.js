import React, { useState } from 'react';
import './LogSignIn.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; 
import { UserAuth } from '../../context/AuthContext';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  

  const navigate = useNavigate();
  
  const auth = UserAuth();
  if (!auth) return <p>Loading...</p>;

 

  const handleLogInClick = () => {
    navigate('/log-in');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
  
    setLoading(true);
  
    // Check if email already exists in your profiles table
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();
  

    if (existingProfile) {
      setErrorMsg('Email is already registered. Please use a different email or log in.');
      setLoading(false);
      return;
    }

    if (profileError) {
      setErrorMsg('Error checking email. Please try agian or enter a valid email.');
      setLoading(false);
      return;
    }
  
  
  
    // Proceed with sign up if no existing profile found
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });
  
    setLoading(false);
  
    if (error) {
      if (
        error.message.toLowerCase().includes('user already registered') ||
        error.status === 400
      ) {
        setErrorMsg('Email is already registered. Please use a different email or log in.');
      } else {
        setErrorMsg(error.message);
      }
    } else {
      alert('Sign-up successful! Check your email to confirm.');
      navigate('/log-in');
    }
  };
  

  return (
    <div className='login-wrapper'>
      <video
      className="background-video"
      src="/videos/stanford-men-footage.mp4"
      autoPlay
      loop
      muted
      />
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="signup-redirect">
          <p>Already have an account?</p>
          <button type="button" onClick={handleLogInClick}>Log In</button>
        </div>
      </div>
    </div>
  );
}
