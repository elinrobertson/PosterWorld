import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../ProductList/ProductList";


const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();

    return (
        <div>
            <ProductList categoryName={category || ''} />
        </div>
    )
}


export default CategoryPage;