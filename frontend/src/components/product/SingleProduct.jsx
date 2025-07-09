import React from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg';

const SingleProduct = ({ product, onViewProduct }) => {
  const handleViewProduct = () => {
    const viewedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    const updatedProducts = [product, ...viewedProducts.filter(p => p.id !== product.id)].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedProducts));

    if (onViewProduct) onViewProduct(product); // Log externally too if needed
  };
  // console.log("SingleProduct - product:", product);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
      {/* ✅ Link wraps image and title */}
      <Link
        to={`/product/${product.slug}/${product.id}`}
        onClick={handleViewProduct}
        className="block"
      >
        <img
          src={product.image || logo}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-bold mb-2 truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm">{product.category?.title || 'General'}</p>
        <p className="text-lg font-semibold text-blue-500 mt-2">${product.price}</p>
      </Link>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          title="Add to Cart"
        >
          <FaCartPlus />
        </button>
        <button
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600"
          title="Add to Wishlist"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;

