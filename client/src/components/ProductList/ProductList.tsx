import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/byCategory/${categoryName.toLowerCase()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [products, categoryName]);

  return (
    <div>
      <h3>Produkter i Kategori</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
