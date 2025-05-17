import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import '../../index.css';
const FilterSidebar = ({
  theme,
  categories,
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
          {Array.isArray(categories) &&
            categories.map((category) => (
              <li className="mt-1" key={category.id}>
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories[category.title] || false}
                  onChange={() => handleCategoryChange(category.title)}
                />
                <label htmlFor={`category-${category.id}`} className="ml-2">
                  {category.title}
                </label>
              </li>
            ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Price Range</h3>

        <div className="px-2">
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={[100, 500]}
            onChange={handlePriceChange}
          />
        </div>

        <div className="flex justify-between text-sm mt-2 px-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
