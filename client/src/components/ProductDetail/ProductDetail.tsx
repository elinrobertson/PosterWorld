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
    <div className="productdetail-wrapper">
      {product ? (
        <>
        <div className="image-container">
          <img src={product.images} alt={product.title} />
        </div>
        <div className="detail-container">
          <h2>{product.title}</h2>
          <p id='description'>{product.description}</p>
          <p id='price'>{product.price} kr</p>
          <div className="button-container">
            <button>Lägg i varukorgen</button>
            <p id='instock'>In Stock: {product.inStock}</p>
          </div>
        </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
