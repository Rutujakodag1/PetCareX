import React from "react";
import { Link } from "react-router-dom";

const ShopByPets = ({ dogImage, catImage, birdImage, rabImage, theme }) => {
  // Conditionally set the background based on the theme
  const cardBackgroundClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Shop by Pets</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className={`flex flex-col items-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl ${cardBackgroundClass}`}>
          <img src={dogImage} alt="Dog" className="mb-2" style={{ height: '160px', width: 'auto' }} />
          <h3 className="font-semibold text-lg">Dogs</h3>
        </div>

        <div className={`flex flex-col items-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl ${cardBackgroundClass}`}>
          <img src={catImage} alt="Cat" className="mb-2" style={{ height: '160px', width: 'auto' }} />
          <h3 className="font-semibold text-lg">Cats</h3>
        </div>

        <div className={`flex flex-col items-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl ${cardBackgroundClass}`}>
          <img src={birdImage} alt="Bird" className="mb-2" style={{ height: '160px', width: 'auto' }} />
          <h3 className="font-semibold text-lg"><Link to="/category/Food/2">Birds</Link> </h3>
        </div>

        <div className={`flex flex-col items-center rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl ${cardBackgroundClass}`}>
          <img src={rabImage} alt="Small Pets" className="mb-2" style={{ height: '160px', width: 'auto' }} />
          <h3 className="font-semibold text-lg">Small Pets</h3>
        </div>
      </div>
    </div>
  );
};

export default ShopByPets;
