import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-login'>
        <p className='footer-login-heading'>
          Sign up to analyze your game effortelessly with CourtVison
        </p>
        <p className='footer-login-text'>
          Enjoy limited features for free
        </p>
        <div className='input-areas'>
          <form>
            <Button buttonStyle='btn--outline'>Log In</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/log-in'>How it works</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              PointView
              <i className="fas fa-video" style={{ marginLeft: '8px' }}></i>
            </Link>
          </div>
          <small class='website-rights'>PointView © 2025</small>
         
        </div>
      </section>
    </div>
  );
}

export default Footer;