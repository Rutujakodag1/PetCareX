import React from "react";

const ProductCard = ({ product, handleViewProduct, buttonClass, theme }) => {
  // Conditionally set card background color based on theme
  const cardBackgroundClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  
  return (
    <div
      key={product.id}
      className={`shadow-lg rounded-lg p-4 flex flex-col items-center ${cardBackgroundClass} transition-transform duration-300 transform hover:scale-105 hover:shadow-xl`}
      onClick={() => handleViewProduct(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-2">${product.price}</p>
      <button className={`${buttonClass} text-white font-medium rounded mt-4`}>
        Add to Cart
      </button>
      <button className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
