import React, { useEffect } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Subscriptions from './Subscriptions';

function Home() {
  //scroll to top when the component mounts
      useEffect(() => {
          window.scrollTo(0, 0);
      }, [/log-in/]); // Trigger the effect when the pathname changes
  return (
    <>
      <HeroSection />
      <Subscriptions />
      <Footer />
    </>
  );
}

export default Home;