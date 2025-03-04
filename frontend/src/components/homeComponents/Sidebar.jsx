import React from "react";

const FilterSidebar = ({
  theme,
  selectedCategories,
  priceRange,
  handleCategoryChange,
  handlePriceChange
}) => {
  return (
    <div className={`w-1/4 p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-lg rounded-lg`}>
      <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Category</h3>
        <ul className="mt-2">
          {['Food', 'Toys', 'Accessories'].map((category) => (
            <li className="mt-1" key={category}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories[category]}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="ml-2">{category}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Price Range</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
