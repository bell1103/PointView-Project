import React, { useState } from 'react';
import './LogSignIn.css';
import { useNavigate } from 'react-router-dom';
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
      setErrorMsg('Passwords do not match');
      return;
    }
  
    setLoading(true);
    setErrorMsg('');
  
    // Use signUpNewUser from context
    const { success, data, error } = await auth.signUpNewUser(email, password);
  
    setLoading(false);
    
   
    if (!success) {
      setErrorMsg(error || 'Sign-up failed. Please try again.');
      return;
    }
    
   
    alert('Sign-up successful! Check your email to confirm your account.');
    navigate('/log-in');
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
