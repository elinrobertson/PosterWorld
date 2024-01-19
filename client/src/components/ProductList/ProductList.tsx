import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { motion } from "framer-motion";
import "./ProductList.css";

interface ProductInfo {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  inStock: number;
  images: string[];
}

interface ProductListProps {
  categoryName: string;
  categoryDescription?: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryName, categoryDescription }) => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setProducts([]);
    setLoading(true);
    setCurrentPage(1);
    fetchProducts();
  }, [categoryName]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/byCategory/${categoryName.toLowerCase()}?page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => (currentPage === 1 ? data : [...prevProducts, ...data]));
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="productlist-main">
        <h3>{categoryName}</h3>
        <p className="category-description">{categoryDescription}</p>
        <ul className="productlist">
          {products.map((product, index) => (
            <li key={`${product._id}_${index}`}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        {hasMore && !loading && (
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Visa mer
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
