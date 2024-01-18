import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";

interface Category {
  _id: string;
  title: string;
  description: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [categoryData, setCategoryData] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        if (category) {
          const response = await fetch(`http://localhost:3000/api/categories/${category.toLowerCase()}`);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setCategoryData(data);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [category]);

  return (
    <div>
      {categoryData && (
        <>
          <h2>{categoryData.title}</h2>
          <p>{categoryData.description}</p>
          <ProductList categoryData={categoryData} />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
