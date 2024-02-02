import React from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { hero1, hero2, hero3 } from '../../assets/Images';
import "./Hero.css";

interface Slide {
    imageUrl: string;
}

const slides: Slide[] = [
    { imageUrl: hero1 },
    { imageUrl: hero2 },
    { imageUrl: hero3 },
  ];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const totalSlides = slides.length;

    const scroll = (direction: 'left' | 'right') => {
        let newIndex = direction === 'left' ? currentSlide -1 : currentSlide +1;

        if(newIndex < 0) {
            newIndex = totalSlides -1;
        } else if (newIndex >= totalSlides) {
            newIndex = 0;
        }

        setCurrentSlide(newIndex);
    }

  return (
    <div className='hero-section'>
        <img className="hero-img" src={slides[currentSlide].imageUrl} alt="hero image" />
            <div className="arrows-icons">
                <MdOutlineKeyboardArrowLeft className="arrows" onClick={() => scroll('left')}/>
                <MdOutlineKeyboardArrowRight className="arrows" onClick={() => scroll('right')}/>
            </div>
    </div>
  )
}

export default Hero