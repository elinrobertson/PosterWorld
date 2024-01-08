import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

interface ProductInfo {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  inStock: number;
  images: string[]; // Anpassa detta beroende på hur bilderna är lagrade i din databas
}

interface ProductListProps {
  categoryName: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryName }) => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);


  useEffect(() => {
    setProducts([]); // Rensa produkter när kategorin ändras
    setHasMore(true); // Återställ hasMore när kategorin ändras
    setCurrentPage(1); // Återställ currentPage när kategorin ändras

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/byCategory/${categoryName.toLowerCase()}?page=${currentPage}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          setHasMore(false); // Inga fler produkter att hämta
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [currentPage, categoryName]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
    <h3>Produkter i Kategori</h3>
    <ul>
      {products.map((product, index) => (
        <li key={`${product._id}_${index}`}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
    {hasMore && <button onClick={loadMore}>Visa mer</button>}
  </div>
  );
};

export default ProductList;
