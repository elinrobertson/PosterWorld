// import React, { useEffect, useState } from "react";

// export interface Category {
//   _id: string;
//   title: string;
//   description: string;
// }

// interface CategoryFetcherProps {
//   categoryId: string;
//   onSuccess: (category: Category) => void;
//   onError: (error: Error) => void;
// }

// const CategoryFetcher: React.FC<CategoryFetcherProps> = ({ categoryId, onSuccess, onError }) => {
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const categoryData: Category = await response.json();
//         onSuccess(categoryData);
//       } catch (error) {
//         // Kontrollera om felet faktiskt är av typen Error innan du skickar det.
//         if (error instanceof Error) {
//           onError(error);
//         } else {
//           // Om felet inte är av typen Error, hantera det på lämpligt sätt.
//           onError(new Error("Ett oväntat fel inträffade."));
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [categoryId, onSuccess, onError]);

//   return null; // Komponenten renderar ingenting, eftersom den är ansvarig för att hämta data.
// };

// export default CategoryFetcher;
