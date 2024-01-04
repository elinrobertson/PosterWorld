import React from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./Hero.css";

interface Slide {
    imageUrl: string;
}

const slides: Slide[] = [
    { imageUrl: 'https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/282333214_2593376810793691_6061322936497149865_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=783fdb&_nc_ohc=HE_CijvzSbsAX8OZ_Iz&_nc_ht=scontent-cph2-1.xx&oh=00_AfBFEA3mkqS8J6hH-yMmUB9YJA8oauO-qNl0zVeYYiagRg&oe=659AA148' },
    { imageUrl: 'https://deseniogroup.com/wp-content/uploads/2022/05/DG-Home-1-Header-Main-kopia-2-scaled.jpg' },
    { imageUrl: 'https://cdn.europosters.eu/image/hp/66515.jpg' },
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
            <div className="arrow-icons">
                <MdOutlineKeyboardArrowLeft className="arrows" onClick={() => scroll('left')}/>
                <MdOutlineKeyboardArrowRight className="arrows" onClick={() => scroll('right')}/>
            </div>
    </div>
  )
}

export default Hero