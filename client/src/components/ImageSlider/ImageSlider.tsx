import React, { useEffect, useState } from 'react';

// Deklarera en generisk typ för produkter
interface Product {
  _id: string;
  title: string;
  images: string[];
}

const ImageSlider = () => {
  const [sliderImages, setSliderImages] = useState<Product[]>([]);

useEffect(() => {
  const fetchRandomProducts = async () => {
    try {
      // Hämta alla produkter med fetch
      const response = await fetch('http://localhost:3000/api/products');
      const allProducts: Product[] = await response.json();

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
  

  return (
    <div>
      <h2>ImageSlider</h2>
      <div>
        {sliderImages.map((product) => (
          <div key={product._id}>
            {product.images.map((image, index) => (
              index === 0 && (
                <img key={index} src={image} alt={`${product.title} - Image ${index + 1}`} />
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
