import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();

    const [categories, setCategories] = useState<{ title: string; description: string }[] | null>(null);
    const [categoryData, setCategoryData] = useState<{ name: string, description: string } | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error(`Failed to fetch categories. HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        if (!categories) {
            fetchCategories();
        }

        if (category && categories) {
            const selectedCategory = categories.find(cat => cat.title.toLowerCase() === category.toLowerCase());
            if (selectedCategory) {
                setCategoryData({ name: selectedCategory.title, description: selectedCategory.description });
            }
        }
    }, [category, categories]);

    return (
        <div>
            {categoryData && (
                <>
                    <ProductList categoryName={categoryData.name} categoryDescription={categoryData.description} />
                </>
            )}
        </div>
    );
}

export default CategoryPage;
