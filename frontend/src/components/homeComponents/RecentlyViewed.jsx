import React from "react";

const RecentlyViewed = ({ recentlyViewed, theme }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed Items</h2>
      {recentlyViewed.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto">
          {recentlyViewed.map((item) => (
            <div
              key={item.id}
              className={`min-w-[200px] max-w-[200px] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-800 text-white "
                  : "bg-white text-gray-800 "
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[150px] object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recently viewed items.</p>
      )}
    </div>
  );
};

export default RecentlyViewed;
