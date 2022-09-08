import React from 'react'
import Header from "../components/Header/Header";
import LandingCarousel from '../components/LandingCarousel';

const LandingPage = () => {
  return (
    <div>
      <Header />
        {/* <h1>
            design landing 
        </h1> */}
        <LandingCarousel />
    </div>
  )
}

export default LandingPage