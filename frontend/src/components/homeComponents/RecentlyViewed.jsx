import React from "react";
import logo from '../../assets/react.svg';
import SingleProduct from "../product/SingleProduct";

const RecentlyViewed = ({ recentlyViewed, theme }) => {
  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.length === 0 ? (
          <p>No products viewed yet.</p>
        ) : (
          recentlyViewed.map((product) => (
            <SingleProduct
              key={product.id}
              product={product}
              onViewProduct={() => console.log("Recently viewed clicked:", product)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentlyViewed;
