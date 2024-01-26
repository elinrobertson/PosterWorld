import { useEffect, useState } from 'react';
import './ImageSlider.css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// Deklarera en generisk typ för produkter
interface Product {
  _id: string;
  title: string;
  images: string[];
  category: string;
}

const ImageSlider = () => {
  const [sliderImages, setSliderImages] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const allProducts: Product[] = await response.json();
        const randomProducts = getRandomProducts(allProducts, 9);
        setSliderImages(randomProducts);
        setVisibleProducts(calculateVisibleImages(randomProducts));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (sliderImages.length > 0) {
        setVisibleProducts(calculateVisibleImages(sliderImages));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderImages, currentIndex]);

  const getRandomProducts = (array: Product[], n: number): Product[] => {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, n);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    if (currentIndex === sliderImages.length) {
      setCurrentIndex(0);
    }

    if (sliderImages.length > 0) {
      setVisibleProducts(calculateVisibleImages(sliderImages));
    }
  }, [currentIndex, sliderImages]);

  const calculateVisibleImages = (images: Product[]) => {
    const screenWidth = window.innerWidth;
    let visibleCount;

    if (screenWidth < 710) {
      visibleCount = 2;
    } else if (screenWidth < 820) {
      visibleCount = 3;
    } else if (screenWidth < 1024) {
      visibleCount = 4;
    } else if (screenWidth < 1270) {
      visibleCount = 5;
    } else {
      visibleCount = 6;
    }

    return images.slice(currentIndex, currentIndex + visibleCount).concat(
      images.slice(0, Math.max(0, visibleCount - (images.length - currentIndex)))
    );
  };

  const handleImageClick = (productId: string, categoryName: string) => {
    navigate(`/${categoryName}/${productId}`);
  };

  return (
    <div className='imageslider-container'>
      <div className='image-wrapper'>
        {visibleProducts.map((product) => (
          <div key={product._id}>
            {product.images.map((image, index) => (
              index === 0 && (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  onClick={() => handleImageClick(product._id, product.category)}
                />
              )
            ))}
          </div>
        ))}
        <div className='imageslider-arrows'>
          <MdOutlineKeyboardArrowLeft className='arrow' onClick={handlePrevClick} />
          <MdOutlineKeyboardArrowRight className='arrow' onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
