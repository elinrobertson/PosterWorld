import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css"

interface ProductInfo {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  inStock: number;
  images: string[];
}

// interface Category {
//   _id: string;
//   title: string;
//   description: string;
// }

interface ProductListProps {
  categoryName: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryName }) => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  // const [category, setCategory] = useState<Category | null>(null);

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
        // Uppdatera produkterna endast om vi är på första sidan, annars lägg till nya produkter
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
    // Ladda fler produkter endast om det inte pågår en laddning och det finns fler
    if (!loading && hasMore) {
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="productlist-main">
      <h3>{categoryName}</h3>
        <ul className="productlist">
          {products.map((product, index) => (
            <li key={`${product._id}_${index}`}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        {/* {loading && <p>Loading...</p>} */}
        {hasMore && !loading && <button onClick={loadMore}>Visa mer</button>}
      </div>
    </div>
  );
};

export default ProductList;
