import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-signup'>
        <p className='footer-signup-heading'>
          Sign up to analyze your game effortelessly with CourtVison
        </p>
        <p className='footer-signup-text'>
          Enjoy limited features for free
        </p>
        <div className='input-areas'>
          <form>
            <Button buttonStyle='btn--outline'>Sign Up</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
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
              CourtVision
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>CourtVision © 2025</small>
         
        </div>
      </section>
    </div>
  );
}

export default Footer;