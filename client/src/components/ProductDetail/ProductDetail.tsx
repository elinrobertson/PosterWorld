import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ProductDetail.css";

interface ProductDetailProps {

}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:3000/api/products/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="productdetail">
      {product ? (
        <>
          <br /><br /><br /><br /><br />
          <h2>{product.title}</h2>
          <p>Price: {product.price} kr</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
          <p>In Stock: {product.inStock}</p>
          <img src={product.images} alt={product.title} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
