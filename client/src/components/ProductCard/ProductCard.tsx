import React from 'react';
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: {
        _id: string;
        title: string;
        price: number;
        category: string;
        description: string;
        inStock: number;
        images: string[];
      };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const navigate = useNavigate();

  const firstImage = product.images && product.images.length > 0 ? product.images[0]: 'placeholder.jpg'

  const handleImageClick = () => {
    // Omvandla produkttiteln till små bokstäver och ersätt mellanslag med bindestreck
    const productTitleInUrl = product.title.toLowerCase().replace(/\s+/g, '-');
    // Navigera till ProductDetail och inkludera den omvandlade produkttiteln i URL:en
    navigate(`/${product.category}/${productTitleInUrl}`);
  };

  return (
    <div className='main-content'>
        <div className="productcard" onClick={handleImageClick}>
            <img src={firstImage} alt={product.title} />
            <div className="productcard-info">
              <h2>{product.title}</h2>
              <p>{product.price} kr</p>
            </div>
        </div>
    </div>
  );
}

export default ProductCard;
