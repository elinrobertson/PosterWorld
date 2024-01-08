import React from 'react';

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
    console.log('Product images:', product.images);

    const firstImage = product.images && product.images.length > 0 ? product.images[0]: 'placeholder.jpg'
  return (
    <div>
      <p>Title: {product.title}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <img src={firstImage} alt={product.title} />
    </div>
  );
}

export default ProductCard;
