import { useEffect, useState } from 'react';
import './ImageSlider.css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// Deklarera en generisk typ för produkter
interface Product {
  _id: string;
  title: string;
  images: string[];
}

const ImageSlider = () => {
  const [sliderImages, setSliderImages] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        console.log('Fetching products...'); // Lägg till denna logg
        // Hämta alla produkter med fetch
        const response = await fetch('http://localhost:3000/api/products');
        const allProducts: Product[] = await response.json();
        console.log('Fetched products:', allProducts);

        // Slumpmässigt välj 9 produkter
        const randomProducts = getRandomProducts(allProducts, 9);

        // Uppdatera staten med de slumpmässiga produkterna
        setSliderImages(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  // Hjälpfunktion för att slumpmässigt välja n produkter från en array
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

  // När currentIndex är lika med längden av bildlistan, sätt tillbaka till början
  useEffect(() => {
    if (currentIndex === sliderImages.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, sliderImages.length]);

  // Se till att alltid visa 6 bilder samtidigt
  const visibleProducts = sliderImages.slice(currentIndex, currentIndex + 6).concat(sliderImages.slice(0, Math.max(0, 6 - (sliderImages.length - currentIndex))));

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
                  onClick={() => navigate(`/products/${product._id}`)}
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
