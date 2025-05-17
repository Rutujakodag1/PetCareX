import React from "react";
import logo from '../../assets/react.svg';

const RecentlyViewed = ({ recentlyViewed, theme }) => {
  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.length === 0 ? (
          <p>No products viewed yet.</p>
        ) : (
          recentlyViewed.map((product) => (
            <div key={product.id} className={`p-4 rounded shadow-md`}>
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p>₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
