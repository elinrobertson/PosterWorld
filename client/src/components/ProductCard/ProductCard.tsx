import React from 'react';
import './ProductCard.css';
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
  const firstImage = product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg';

  const handleImageClick = async () => {
    try {
      const url = `http://localhost:3000/api/products/${product.category}/${product.title.replace(/\s+/g, '%20')}`;
      console.log("Fetching product with URL:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched product data:", data);

      navigate(`/${product.category}/${data._id}`);
    } catch (error) {
      console.error('Error fetching product by title:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="productcard" onClick={handleImageClick}>
        <img src={firstImage} alt={product.title} />
        <div className="productcard-info">
          <h2>{product.title}</h2>
          <p>{product.price} kr</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
