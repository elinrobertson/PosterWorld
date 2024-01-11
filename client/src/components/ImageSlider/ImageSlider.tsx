// import React, { useState } from 'react';
// import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
// import "./ImageSlider.css"

// interface ImageSliderProps {
//   images: string[];
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const canScrollLeft = currentImageIndex > 0;
//   const canScrollRight = currentImageIndex < images.length - 1;

//   const scroll = (direction: 'left' | 'right') => {
//   if (direction === 'left' && canScrollLeft) {
//     setCurrentImageIndex(currentImageIndex - 1);
// } else if (direction === 'right' && canScrollRight) {
//     setCurrentImageIndex(currentImageIndex + 1);
// }
// };

// return (
//   <div className="image-slider">
//       {canScrollLeft && (
//           <div className="arrow-icon">
//             <MdOutlineKeyboardArrowLeft className="arrow arrow-left" onClick={() => scroll('left')} />
//           </div>
//       )}

//       <img src={images[currentImageIndex]} alt={`Product Image ${currentImageIndex + 1}`} className="image" />

//       {canScrollRight && (
//           <div className="arrow-icon">
//             <MdOutlineKeyboardArrowRight className="arrow arrow-right" onClick={() => scroll('right')} />
//           </div>
//       )}

//       <div className="dots-container">
//           {images.map((_, index) => (
//               <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`}></span>
//           ))}
//       </div>
//   </div>
// );
// };

// export default ImageSlider;
