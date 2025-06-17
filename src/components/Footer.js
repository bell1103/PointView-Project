
import React, {useState} from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


function Footer() {
const[button] = useState(true);
const { user: sessionUser, signOut, loading } = UserAuth();
const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);
  
const closeMobileMenu = () => setClick(false);
  return (
    <div className='footer-container'>
      <section className='footer-login'>
        <p className='footer-login-heading'>
          Sign up to analyze your game effortlessly with PointView
          <i className="fas fa-video" style={{ marginLeft: '8px' }}></i>
            
        </p>
        <p className='footer-login-text'>
          Enjoy limited features for free
        </p>
        <div className='input-areas'>
        <div className="footer-profile-wrapper">
        <Link
          to={sessionUser ? '/profile' : '/log-in'}
          className="nav-user-profile-link"
          onClick={closeMobileMenu}
        >
          <div className="nav-user-profile">
            <i className="fas fa-user-circle"></i>
            <span className="nav-username">
              {sessionUser ? sessionUser.email.split('@')[0] : 'Log In'}
            </span>
          </div>
        </Link>
      </div>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link to='/about-us'>About Us</Link>
            <Link to='/log-in'>How It Works</Link>
            <Link to='/'>FAQ</Link>
            <Link to='/contact'>Contact Us</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              PointView
              <i className="fas fa-video" style={{ marginLeft: '8px' }}></i>
            </Link>
          </div>
          <small className='website-rights'>PointView © 2025</small>
         
        </div>
      </section>
    </div>
  );
}

export default Footer;