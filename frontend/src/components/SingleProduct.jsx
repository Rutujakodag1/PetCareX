import React from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SingleProduct = ({ product }) => {
  return (
    
    <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
      {/* Product Image */}
      <Link to={`/product/${product.title}/${product.id}`}>
      <img
        src={product.image || 'https://cdn.stocksnap.io/img-thumbs/280h/dog-animal_DOTORLBDD7.jpg'} // Fallback to placeholder image
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
    </Link>
      {/* Product Details */}
      <h3 className="text-lg font-bold mb-2 truncate">{product.title}</h3>
      <p className="text-gray-500 text-sm">{product.category || 'General'}</p>
      <p className="text-lg font-semibold text-blue-500 mt-2">${product.price}</p>

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
