// import React from 'react'
import Hero from '../Hero/Hero';
import ImageSlider from '../ImageSlider/ImageSlider';
import "./Home.css"


const Home = () => {
  return (
    <div className='home-section'>
        <Hero />
        <h3>Nyheter</h3>
        <ImageSlider />
    </div>
  )
}

export default Home