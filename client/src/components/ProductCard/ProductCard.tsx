import React from 'react';
import "./ProductCard.css"

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

    const firstImage = product.images && product.images.length > 0 ? product.images[0]: 'placeholder.jpg'
  return (
    <div className='main-content'>
        <div className="productcard">
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
