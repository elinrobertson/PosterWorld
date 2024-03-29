import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from '../../context/CartContext';
import ImageSlider from '../ImageSlider/ImageSlider';
import "./ProductDetail.css";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? product.images.length - 1 : prevSlide - 1));
    } else {
      setCurrentSlide((prevSlide) => (prevSlide === product.images.length - 1 ? 0 : prevSlide + 1));
    }
  };

  const handleAddToCart = (stock: number) => {
    if (stock > 0 && product && product._id && product.price) {
      addToCart({
        productId: product._id,
        quantity: 1,
        title: product.title,
        images: product.images,
        price: product.price,
        price_id: product.price_id,
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <>
    <div className="productdetail-wrapper">
      {product ? (
        <>
          <div className="image-container">
            <img className="product-img" src={product.images[currentSlide]} alt={product.title} />
            {product.images.length > 1 && (
              <div className="arrow-icons">
                <MdOutlineKeyboardArrowLeft className="arrows" onClick={() => scroll('left')} />
                <MdOutlineKeyboardArrowRight className="arrows" onClick={() => scroll('right')} />
              </div>
            )}
          </div>
          <div className="detail-container">
            <h2>{product.title}</h2>
            <p id='description'>{product.description}</p>
            <p id='price'>{product.price} kr</p>
            <div className="button-container">
              <div className="button-container-buttons">
                <motion.button
                  whileHover={product.inStock > 0 ? { scale: 1.1 } : {}}
                  whileTap={product.inStock > 0 ? { scale: 0.9 } : {}}
                  onClick={() => handleAddToCart(product.inStock)}
                  disabled={product.inStock === 0}
                  className={product.inStock === 0 ? "motion-button-disabled" : ""}
                >
                  Lägg i varukorgen
                </motion.button>
                <motion.button 
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                  onClick={handleGoBack}>Tillbaka
                </motion.button>
              </div>
              <p id='instock'>
                {product.inStock > 0 ? (
                  <>
                    I lager
                    <IoMdCheckmarkCircleOutline style={{ marginLeft: '5px' }} />
                  </>
                ) : (
                  <>
                  <p style={{ color: 'rgb(219, 107, 95)' }}>Ej i lager</p>
                  <IoCloseOutline style={{ color: 'rgb(219, 107, 95)', marginLeft: '5px' }} />
                </>
                )}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
    <div className='productdetail-slider'>
      <h3>Vi rekommenderar</h3>
      <ImageSlider />
    </div>
    </>
  );
};

export default ProductDetail;
