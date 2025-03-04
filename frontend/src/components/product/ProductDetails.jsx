import React from "react";

const ProductDetailView = ({ product, closeDetailView, theme }) => {
  if (!product) return null;

  const cardBackgroundClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center`}>
      <div className={`p-6 w-4/5 max-w-2xl rounded-lg ${cardBackgroundClass}`}>
        <button
          className="absolute top-4 right-4 text-red-500 font-bold"
          onClick={closeDetailView}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
        <p className="mb-2 text-lg font-semibold">Price: ${product.price}</p>
        <p className="text-gray-600">{product.description}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
