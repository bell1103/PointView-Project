import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/tennis match-1.mp4' autoPlay loop muted />
      <h1>PLAY WITH A PLAN</h1>
      <p>Improve your game with CourtVision</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          UPLOAD MATCHES
        </Button>
    
      </div>
    </div>
  );
}

export default HeroSection;