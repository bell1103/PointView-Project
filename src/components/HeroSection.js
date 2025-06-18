import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/stanford-men-footage.mp4' autoPlay loop muted />
      <h1>PLAY WITH A PLAN</h1>
      <p>Improve your game with PointView</p>
      <div className='hero-btns'>
        <Link to="/log-in">
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            LOG IN  
          </Button>
        </Link>
        

      </div>
    </div>
  );
}

export default HeroSection;