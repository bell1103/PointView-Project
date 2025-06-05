import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';
import LogIn from './LogIn';
import SignUp from './SignUp';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards/>
      <Footer/>
      <LogIn/>
      <SignUp/>
    </>
  );
}

export default Home;