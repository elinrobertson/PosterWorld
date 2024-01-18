// import React from 'react'
import Hero from '../Hero/Hero';
import ImageSlider from '../ImageSlider/ImageSlider';
import "./Home.css"
import { inspo1, inspo2, inspo3, inspo4 } from '../../assets/HeroImages';


const Home = () => {
  return (
    <div className='home-section'>
        <Hero />
        <h3>Nyheter</h3>
        <ImageSlider />
        <h3>Inspiration till tavelvägg</h3>
        <div className='inspo-wrapper'>
          <div className='first-images'>
            <img src={inspo1} alt="inspo 1" />
            <img src={inspo2} alt="inspo 2" />
          </div>
          <div className='second-images'>
            <img src={inspo3} alt="inspo 3" />
            <img src={inspo4} alt="inspo 4" />
          </div>
        </div>
        <h3>Bästsäljare</h3>
        <ImageSlider />
    </div>
  )
}

export default Home