import React from 'react';
import '../../App.css';
import Cards from '../Card';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Hookpr from '../Hookpr';

function Home() {
  return (
    <>
      <HeroSection />
      <Hookpr />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
